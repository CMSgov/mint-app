import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Card,
  CardGroup,
  Grid,
  GridContainer,
  Icon
} from '@trussworks/react-uswds';
import classNames from 'classnames';
import { ViewCustomizationType } from 'gql/gen/graphql';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import Alert from 'components/shared/Alert';

import { HomepageSettingsLocationType } from '.';

import './index.scss';

/**
 * Moves an item in an array up or down by one position.
 *
 * @param {Array<ViewCustomizationType>} array - The array to modify.
 * @param {number} index - The index of the item to move.
 * @param {'up' | 'down'} direction - The direction to move the item ('up' or 'down').
 * @returns {Record<'viewCustomization', Array<ViewCustomizationType>>} A new array with the item moved, or the original array if the move is not possible.
 */

const moveItem = (
  array: ViewCustomizationType[],
  index: number,
  direction: 'up' | 'down'
): Record<'viewCustomization', Array<ViewCustomizationType>> => {
  // Clone the array to avoid mutating the original array
  const newArray = [...array];

  // Calculate the new index based on the direction
  const newIndex = direction === 'up' ? index - 1 : index + 1;

  // Check if the new index is within the bounds of the array
  if (newIndex >= 0 && newIndex < array.length) {
    // Swap the elements
    [newArray[index], newArray[newIndex]] = [
      newArray[newIndex],
      newArray[index]
    ];
  }

  return { viewCustomization: newArray };
};

const SettingsOrder = () => {
  const { t: homepageSettingsT } = useTranslation('homepageSettings');
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const history = useHistory();

  const location = useLocation<{
    homepageSettings: HomepageSettingsLocationType['homepageSettings'];
  }>();

  const [selectedSettings, setSelectedSettings] = useState<
    HomepageSettingsLocationType['homepageSettings']
  >(
    location.state
      .homepageSettings as HomepageSettingsLocationType['homepageSettings']
  );

  // Passes the current state to the previous page if navigating back
  useEffect(() => {
    // Blocks the route transition until unblock() is called
    const unblock = history.block(destination => {
      unblock();
      history.push({
        pathname: destination.pathname,
        state:
          // If the destination is the homepage settings page, pass the current state
          destination.pathname === '/homepage-settings'
            ? location.state
            : undefined
      });
      return false;
    });

    return () => {};
  }, [history, location]);

  return (
    <MainContent data-testid="new-plan">
      <GridContainer>
        <Grid desktop={{ col: 12 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
          <BreadcrumbBar variant="wrap">
            <Breadcrumb>
              <BreadcrumbLink asCustom={Link} to="/">
                <span>{miscellaneousT('home')}</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>{homepageSettingsT('heading')}</Breadcrumb>
          </BreadcrumbBar>

          <h1 className="margin-bottom-2">
            {homepageSettingsT('heading')}
            <span className="font-body-lg text-base text-normal margin-left-2">
              {homepageSettingsT('stepTwo')}
            </span>
          </h1>

          <p className="font-body-lg margin-top-0 margin-bottom-6">
            {homepageSettingsT('descriptionTwo')}
          </p>

          <h3>{homepageSettingsT('selectionTwo')}</h3>

          <Grid desktop={{ col: 6 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
            <CardGroup className="margin-0 margin-bottom-6">
              {selectedSettings.viewCustomization.map((setting, index) => (
                <Grid
                  desktop={{ col: 12 }}
                  tablet={{ col: 12 }}
                  mobile={{ col: 12 }}
                  key={setting}
                >
                  <div
                    className="display-flex flex-align-center margin-bottom-2"
                    key={setting}
                  >
                    <h3 className="margin-0 margin-right-2 width-4">
                      {index + 1}
                    </h3>

                    <Card className="settings__card margin-bottom-0 width-full">
                      <div className="padding-0 display-flex flex-align-center flex-justify">
                        <p className="margin-0 padding-0 text-bold">
                          {setting}
                        </p>

                        <div className="display-flex flex-align-center">
                          <Icon.ArrowDropUp
                            className={classNames(
                              {
                                settings__icon__disabled: index === 0
                              },
                              'settings__icon margin-right-1'
                            )}
                            onClick={() =>
                              setSelectedSettings(
                                moveItem(
                                  selectedSettings.viewCustomization,
                                  index,
                                  'up'
                                )
                              )
                            }
                            size={4}
                          />

                          <Icon.ArrowDropDown
                            className={classNames(
                              {
                                settings__icon__disabled:
                                  index ===
                                  selectedSettings.viewCustomization.length - 1
                              },
                              'settings__icon'
                            )}
                            onClick={() =>
                              setSelectedSettings(
                                moveItem(
                                  selectedSettings.viewCustomization,
                                  index,
                                  'down'
                                )
                              )
                            }
                            size={4}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Grid>
              ))}
            </CardGroup>
          </Grid>

          <div>
            <UswdsReactLink
              to="/homepage-settings"
              className="display-flex flex-align-center"
            >
              <Icon.ArrowBack className="margin-right-2" />
              {homepageSettingsT('back')}
            </UswdsReactLink>
          </div>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default SettingsOrder;
