package main

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/viper"

	"github.com/cmsgov/mint-app/pkg/appconfig"
	"github.com/cmsgov/mint-app/pkg/cedar/cedarldap"
	"github.com/cmsgov/mint-app/pkg/models"
)

// const filePath = `cmd/backfill/data/sensitive/databackfillSept.csv`
// const outputTranslatePath = `cmd/backfill/data/sensitive/databackfillSeptTranslated.json`
// const outputTranslateEditPath = `cmd/backfill/data/sensitive/databackfillSeptTranslatedEdit.json`
// const outputUploadPath = `cmd/backfill/data/sensitive/databackfillSeptUploaded.json`

// const translationPath = `cmd/backfill/data/dataTranslation.csv`
const translationFullPath = `cmd/backfill/data/dataTranslationFull.csv`
const userPath = `cmd/backfill/data/sensitive/possibleUsers.json`
const enumTranslationPath = `cmd/backfill/data/enumTranslations.json`
const userInfoOutPut = `cmd/backfill/data/sensitive/userInfoOutput.json`

func main() { //TODO make this a command
	testTransform := false
	testUpload := true
	useEdit := false
	useDecember13 := true
	testUserInfo := false

	testTransform = true
	// testUpload = true
	// useEdit = false
	// useDecember13 = true
	// testUserInfo = true

	//Default vars
	filePath := `cmd/backfill/data/sensitive/databackfillSept.csv`
	outputTranslatePath := `cmd/backfill/data/sensitive/databackfillSeptTranslated.json`
	outputTranslateEditPath := `cmd/backfill/data/sensitive/databackfillSeptTranslatedEdit.json`
	outputUploadPath := `cmd/backfill/data/sensitive/databackfillSeptUploaded.json`
	outputUploadWorklistPath := `cmd/backfill/data/sensitive/databackfillSeptUploadedWorklist.json`

	if useDecember13 {
		filePath = "cmd/backfill/data/sensitive/dataBackfillDec13.csv"
		outputTranslatePath = `cmd/backfill/data/sensitive/databackfillDec13Translated.json`
		outputUploadPath = `cmd/backfill/data/sensitive/databackfillDec13Uploaded.json`
		outputUploadWorklistPath = `cmd/backfill/data/sensitive/databackfillDec13UploadedWorklist.json`
	}

	backfiller := getDefaultBackfiller()

	if testTransform {
		transformData(backfiller, filePath, outputTranslatePath)
	}
	if testUpload {
		transformedDataPath := outputTranslatePath
		if useEdit {
			transformedDataPath = outputTranslateEditPath
		}
		uploadData(backfiller, transformedDataPath, outputUploadPath, outputUploadWorklistPath)
	}
	if testUserInfo {
		getAllUsersInfo()
	}
}

// UserInfoErr represents errors obtained when fetching a users info
type UserInfoErr struct {
	UserName string
	Message  string
	Error    interface{}
}

func getAllUsersInfo() {
	config := viper.New()
	config.AutomaticEnv()

	cedarLDAPClient := cedarldap.NewTranslatedClient(
		config.GetString(appconfig.CEDARAPIURL),
		config.GetString(appconfig.CEDARAPIKey),
	)
	fetchErrors := []UserInfoErr{}
	// "Amy Giardina", "Siobhan Yilmaz",
	userNames := []string{

		"Amy Giardina",
		"Siobhan Yilmaz",
	}
	allUserInfo := []*models.UserInfo{}

	firstInfo, err := cedarLDAPClient.SearchCommonNameContains(context.Background(), "steven wade")
	log.Default().Print(firstInfo, err)
	for _, name := range userNames {
		userInforArr, err := getUserInfo(name, cedarLDAPClient)
		if err != nil {
			fetchErrors = append(fetchErrors, UserInfoErr{
				UserName: name,
				Message:  err.Error(),
				Error:    err,
			})
			continue
		}
		allUserInfo = append(allUserInfo, userInforArr[0])
	}
	writeObjectToJSONFile(allUserInfo, userInfoOutPut)
	writeObjectToJSONFile(fetchErrors, userInfoOutPut+"Errors.json")

}

func getUserInfo(name string, client cedarldap.Client) ([]*models.UserInfo, error) {
	userInfoArr, err := client.SearchCommonNameContains(context.Background(), name)

	return userInfoArr, err

}
func getDefaultBackfiller() *Backfiller {
	possibleUserList := []PossibleUser{}

	err := readJSONFromFile(userPath, &possibleUserList)
	if err != nil {
		log.Fatal(err)
	}
	possibleUserDict := NewPossibleUserDictionary(possibleUserList)

	enumTranslationList := []EmumTranslation{}
	err = readJSONFromFile(enumTranslationPath, &enumTranslationList)
	if err != nil {
		log.Fatal(err)
	}
	enumTranslationDict := NewEmumTranslationDictionary(enumTranslationList)
	backfiller := NewBackfiller(nil, possibleUserDict, enumTranslationDict) //make first so each translation can have a reference

	translation, err := readFile(translationFullPath)
	if err != nil {
		log.Fatal(err)
	}
	td := NewTranslationDictionary()

	td.convertDataTable(translation)
	backfiller.TDictionary = &td

	return backfiller
}
func uploadData(backfiller *Backfiller, transformDataPath string, outputUploadPath string, outputUploadWorklistPath string) {

	entries, err := getTransformedData(transformDataPath)
	if err != nil {
		log.Default().Print("Error getting data from ", transformDataPath)
		return
	}
	log.Default().Print("Uploading data from ", transformDataPath)

	uploader := NewUploader(backfiller)
	uploader.uploadEntries(entries)
	writeObjectToJSONFile(entries, outputUploadPath)

	var UErrs []UploadError
	for _, entry := range entries {
		UErrs = append(UErrs, entry.UErrors...)
	}

	writeObjectToJSONFile(UErrs, outputUploadPath+"UploadErrs.json")

	var WorklistEntries []UploadWorklist
	for _, entry := range entries {
		wklist := entry.convertTErrorsToWorklistEntries()
		WorklistEntries = append(WorklistEntries, wklist...)
	}

	writeObjectToJSONFile(WorklistEntries, outputUploadWorklistPath)

}

// func valueOrPointer[anyType interface{}](value anyType, isPointer bool) reflect.Value {

func readJSONFromFile[anyType interface{}](file string, obj *anyType) error {

	f, err := os.Open(file) //nolint
	if err != nil {
		log.Fatal(err)
		return err
	}
	defer f.Close() //nolint

	byteValue, _ := ioutil.ReadAll(f)
	err = json.Unmarshal(byteValue, &obj)

	return err

}

func getTransformedData(file string) ([]*BackfillEntry, error) {
	f, err := os.Open(file) //nolint
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	// remember to close the file at the end of the program
	defer f.Close() //nolint

	byteValue, _ := ioutil.ReadAll(f)

	entries := []*BackfillEntry{}
	err = json.Unmarshal(byteValue, &entries)
	return entries, err
}
func transformData(backfiller *Backfiller, rawDataPath string, outputTranslatePath string) {

	table, err := readFile(rawDataPath)

	if err != nil {
		log.Fatal(err)
	}

	// entries, err := translateFile(&td, table)
	entries, err := backfiller.translateFile(table)
	if err != nil {
		log.Fatal(err)
	}

	writeObjectToJSONFile(entries, outputTranslatePath)
	var tErrs []TranslationError
	for _, entry := range *entries {
		tErrs = append(tErrs, entry.TErrors...)
	}

	// tErrs := lo.Map[[]TranslationError](entries, func(entry *BackfillEntry, index int)[]TranslationError {
	// 	return entry.TErrors
	// })
	writeObjectToJSONFile(tErrs, outputTranslatePath+"TErrs.json")

}

func writeObjectToJSONFile(object interface{}, path string) {
	entryBytes, err := json.Marshal(object)
	if err != nil {
		panic("Can't serialize the object")
	}

	file, err := os.Create(filepath.Clean(path))
	if err != nil {

		panic("Can't create the file")
	}
	_, err = file.Write(entryBytes)
	if err != nil {
		panic("Can't write the file")
	}
}

// func writeObjectArrayToCSVFile(object []interface{}, path string){

// }

// DataTable represents a table of data, (like a CSV or excel spreadshet)
type DataTable struct {
	Header map[int]string
	Rows   map[int]DataRow
}

// NewDataTable instantiates a DataTable
func NewDataTable() DataTable {
	return DataTable{
		Header: map[int]string{},
		Rows:   map[int]DataRow{},
	}
}

// DataRow is the representation of a row of data in a Data Table
type DataRow struct {
	Fields map[string]interface{}
}

// NewDataRow instantiates a DataRow
func NewDataRow() DataRow {
	return DataRow{
		Fields: map[string]interface{}{},
	}
}

func (dt *DataTable) processCSV(csv *csv.Reader) {
	header, headerErr := csv.Read()
	if headerErr != nil {
		log.Fatal(headerErr)
	}
	dt.processHeader(header)

	rowErrs := dt.processRows(csv)
	if len(rowErrs) > 0 {
		log.Fatal("something went wrong processing the rows")
	}
}

func (dt *DataTable) processHeader(header []string) {
	for i := 0; i < len(header); i++ {
		dt.Header[i] = header[i]

	}
}

func (dt *DataTable) processRows(csv *csv.Reader) []error {
	var err error

	errs := []error{}
	i := 0
	for err == nil {
		row, err := csv.Read()
		if err != nil {
			if err != io.EOF {
				errs = append(errs, err)
			}
			// continue
			break
		}

		dataRow := dt.processRow(row)
		dt.Rows[i] = dataRow
		i++
	}
	return errs

}

func (dt *DataTable) processRow(row []string) DataRow {

	dr := NewDataRow()
	for i := 0; i < len(row); i++ {
		dr.Fields[dt.Header[i]] = row[i] //Make a map with the header value as the key for the row
	}
	return dr
}

func readFile(file string) (*DataTable, error) {

	table := NewDataTable()
	// open file
	f, err := os.Open(file) //nolint
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	// remember to close the file at the end of the program
	defer f.Close() //nolint

	src := csv.NewReader(f)
	table.processCSV(src)

	return &table, nil
}
