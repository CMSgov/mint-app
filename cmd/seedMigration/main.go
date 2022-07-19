package main

import (
	"bufio"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strings"
)

var Schema *dbSchema

func main() {
	path := flag.String("path", "", "")
	flag.Parse()
	fmt.Println("my path:  \n", path)
	filePath := "scripts/data/stevenTestInsert.sql"
	if path != nil {
		if *path != "" {

			fmt.Println("Filepath provided")
			fmt.Println(*path)
			filePath = *path
		}
	}
	//GET CURRENT SCHEMA
	Schema, err := parseSchema()
	_ = Schema
	// Schema = schema
	if err != nil {
		panic(err)
	}
	err = readFile(filePath)

}

func readFile(file string) error {
	// open file
	f, err := os.Open(file)
	// f, err := os.Open("file.txt")
	if err != nil {
		log.Fatal(err)
		return err
	}
	// remember to close the file at the end of the program
	defer f.Close()

	// read the file line by line using scanner
	scanner := bufio.NewScanner(f)

	anyLinesChanged := false

	for scanner.Scan() {
		line, changed := readline(scanner)
		if changed {
			// fmt.Printf("line: %s\n", scanner.Text())
			fmt.Printf("line: %s\n", line)
			anyLinesChanged = true
		}

	}
	fmt.Println("finished verifying seed file. File changes := ", anyLinesChanged)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
		return err
	}

	// Get the file, read the lines
	//when you get to an insert statement, find the schame file, see if it matches, if so move on
	return nil
}

func readline(scanner *bufio.Scanner) (string, bool) {
	line := scanner.Text()
	newLine := line
	lineChanged := false

	if strings.HasPrefix(line, "INSERT") {
		insertStatement := parseInsertStatement(line)
		changed := checkInsertSchemaChanged(&insertStatement)
		if changed {
			newLine = updateLine(insertStatement)
			lineChanged = true
		}
	}
	return newLine, lineChanged

}

func checkInsertSchemaChanged(insStat *insertStatement) bool {
	table := Schema.GetTable(insStat.table)
	changed := false
	//CASE Column removed --> Should we report which column?
	if len(table.Columns) != len(insStat.entries) {
		changed = true
	}
	//TODO Other Cases
	/*
		1. data type changed?
		2. Nullability changed?

	*/

	return changed

}

func updateLine(insert insertStatement) string {

	return ""

}

func parseInsertStatement(line string) insertStatement {
	insStat := insertStatement{
		line: line,
	}
	line = strings.Trim(line, ")")
	tableNameSplit := strings.Split(line, "INSERT INTO ")
	parts := strings.Split(tableNameSplit[1], "(")
	fullTableName := parts[0]
	columnString := strings.ReplaceAll(parts[1], ") VALUES", "")
	valueString := strings.ReplaceAll(parts[2], ");", "")
	tableName := strings.TrimSpace(((strings.Split(fullTableName, "."))[1]))
	columns := strings.Split(columnString, ", ")
	values := strings.Split(valueString, ", ") //need to split with a space to allow for enums, this can also make isues because of free text with spaces. We need to do a regex spit insteas

	insStat.table = tableName
	err := insStat.buildEntries(columns, values)
	if err != nil {
		log.Fatal(err)
	}

	return insStat
}

func (insStat *insertStatement) buildEntries(col []string, val []string) error {
	if len(col) != len(val) {
		return fmt.Errorf("column and value lengeth don't match")
	}

	for i := 0; i < len(col); i++ {
		entry := insertEntry{
			column: strings.TrimSpace(col[i]),
			value:  strings.TrimSpace(val[i]),
		}
		insStat.entries = append(insStat.entries, entry)
	}

	return nil

}

type insertStatement struct {
	line    string
	table   string
	entries []insertEntry
}

type insertEntry struct {
	column string
	value  string
}

type TableSchema struct {
	Name    string
	Columns map[string]columnSchema
}

type columnSchema struct {
	Name     string
	DataType string
	NotNull  bool
}

type dbSchema struct {
	Tables map[string]TableSchema
}

func parseSchema() (*dbSchema, error) {

	schemaPath := "scripts/data/currentSchema.sql"

	b, err := ioutil.ReadFile(schemaPath)

	// f, err := os.Open(schemaPath)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	schemaString := string(b)

	// remember to close the file at the end of the program
	// defer f.Close()

	regexPattern := `(CREATE TABLE )([\s\S]*?)(\);){1}`

	//todo, get all the text, compile regex and match from that pattern to get all the create table stuff ( or see if I can do it in BASH)
	newSchema := dbSchema{
		Tables: map[string]TableSchema{},
	}

	re := regexp.MustCompile(regexPattern)
	tables := re.FindAllString(schemaString, -1)

	for i := 0; i < len(tables); i++ {
		table := parseTable(tables[i])
		newSchema.Tables[table.Name] = table
	}

	return &newSchema, nil

}

func (s *dbSchema) GetTable(name string) TableSchema {

	return s.Tables[name]

}

func parseTable(tableString string) TableSchema {

	Schema := TableSchema{
		Columns: map[string]columnSchema{},
	}
	tableString = strings.Trim(tableString, ");")
	tableNameSplit := strings.Split(tableString, "CREATE TABLE ")
	parts := strings.Split(tableNameSplit[1], "(")
	fullTableName := parts[0]
	columnDef := parts[1]
	tableName := strings.TrimSpace(((strings.Split(fullTableName, "."))[1]))

	Schema.Name = tableName
	columnDef = strings.ReplaceAll(columnDef, "\n", "")
	cols := strings.Split(columnDef, ",")

	for i := 0; i < len(cols); i++ {
		col := parseCol(cols[i])
		Schema.Columns[col.Name] = col
	}

	return Schema
}
func parseCol(colString string) columnSchema {
	col := columnSchema{}
	fields := strings.Fields(colString)

	col.Name = fields[0]
	col.DataType = fields[1]

	col.NotNull = strings.Contains(colString, "NOT NULL")

	return col
}
