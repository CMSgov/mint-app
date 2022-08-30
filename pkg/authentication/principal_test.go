package authentication

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestPrincipal(t *testing.T) {
	// Arrange
	id := fmt.Sprintf("%X", time.Now())

	testCases := map[string]struct {
		p                     Principal
		expectID              string
		expectAllowUser       bool
		expectAllowAssessment bool
	}{
		"anonymous is unauthorized": {
			p:                     ANON,
			expectID:              anonID,
			expectAllowUser:       false,
			expectAllowAssessment: false,
		},
		"regular eua user": {
			p: &EUAPrincipal{
				EUAID:             id,
				JobCodeUSER:       true,
				JobCodeASSESSMENT: false,
			},
			expectID:              id,
			expectAllowUser:       true,
			expectAllowAssessment: false,
		},
		"assessment user": {
			p: &EUAPrincipal{
				EUAID:             id,
				JobCodeUSER:       false,
				JobCodeASSESSMENT: true,
			},
			expectID:              id,
			expectAllowUser:       false,
			expectAllowAssessment: true,
		},
		"both users": {
			p: &EUAPrincipal{
				EUAID:             id,
				JobCodeUSER:       true,
				JobCodeASSESSMENT: true,
			},
			expectID:              id,
			expectAllowUser:       true,
			expectAllowAssessment: true,
		},
	}

	for name, tc := range testCases {
		t.Run(name, func(t *testing.T) {
			// Act - not needed

			//Assert
			assert.NotEmpty(t, tc.p.String(), "fmt.Stringer")
			assert.NotEmpty(t, tc.p.ID(), "ID()")
			assert.Equal(t, tc.expectID, tc.p.ID(), "ID()")
			assert.Equal(t, tc.expectAllowUser, tc.p.AllowUSER(), "AllowUSER()")
			assert.Equal(t, tc.expectAllowAssessment, tc.p.AllowASSESSMENT(), "AllowASSESSMENT()")
		})
	}
}
