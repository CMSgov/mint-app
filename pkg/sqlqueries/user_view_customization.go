package sqlqueries

import _ "embed"

// userViewCustomizationCreateSQL creates a new UserViewCustomization object
//
//go:embed SQL/user_view_customization/create.sql
var userViewCustomizationCreateSQL string

// userViewCustomizationGetByUserIDSQL returns a corresponding UserViewCustomization object by it's ID
//
//go:embed SQL/user_view_customization/get_by_user_id.sql
var userViewCustomizationGetByUserIDSQL string

// userViewCustomizationUpdateSQL returns a corresponding UserViewCustomization object by it's ID
//
//go:embed SQL/user_view_customization/update.sql
var userViewCustomizationUpdateSQL string

type userViewCustomizationScripts struct {
	// Holds the SQL query to create a UserViewCustomization
	Create string

	// Holds the SQL query for returning a UserViewCustomization object by User ID
	GetByUserID string

	// Holds the SQL query for updating a User UserViewCustomization object
	Update string
}

// UserViewCustomization holds all the SQL scrips related to the UserViewCustomization Entity
var UserViewCustomization = userViewCustomizationScripts{
	Create:      userViewCustomizationCreateSQL,
	GetByUserID: userViewCustomizationGetByUserIDSQL,
	Update:      userViewCustomizationUpdateSQL,
}
