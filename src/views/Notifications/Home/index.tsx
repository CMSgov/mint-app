import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { Alert, Button, Grid, GridContainer } from '@trussworks/react-uswds';
import {
  useGetNotificationsQuery,
  useUpdateAllNotificationsAsReadMutation
} from 'gql/gen/graphql';

import Breadcrumbs from 'components/Breadcrumbs';
import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import Spinner from 'components/Spinner';
import { NotFoundPartial } from 'views/NotFound';

import IndividualNotification from './_components/IndividualNotification';

const NotificationsHome = () => {
  const [pageOffset, setPageOffset] = useState(0);

  const { t: notificationsT } = useTranslation('notifications');
  const { t: generalT } = useTranslation('general');
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const { data, loading, error, refetch } = useGetNotificationsQuery();
  const [markAllAsRead] = useUpdateAllNotificationsAsReadMutation();

  const numUnreadNotifications =
    data?.currentUser.notifications.numUnreadNotifications;

  const allNotifications = data?.currentUser.notifications.notifications!;

  const breadcrumbs = [
    { text: miscellaneousT('home'), url: '/' },
    { text: notificationsT('breadcrumb') }
  ];

  if ((!loading && error) || (!loading && !data?.currentUser)) {
    return <NotFoundPartial />;
  }

  // Pagination Configuration
  const itemsPerPage = 10;
  const endOffset = pageOffset + itemsPerPage;
  const currentNotifications = allNotifications?.slice(pageOffset, endOffset);
  const pageCount = allNotifications
    ? Math.ceil(allNotifications.length / itemsPerPage)
    : 1;

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemsPerPage) % allNotifications?.length;
    setPageOffset(newOffset);
  };

  return (
    <MainContent data-testid="notification-index">
      <GridContainer>
        <Grid desktop={{ col: 12 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
          <Breadcrumbs className="margin-bottom-4" items={breadcrumbs} />

          <Grid
            row
            desktop={{ col: 12 }}
            className="flex-justify flex-align-center"
          >
            <PageHeading className="margin-y-0">
              {notificationsT('index.heading')}
            </PageHeading>

            <div>
              {numUnreadNotifications !== 0 && (
                <Button
                  type="button"
                  unstyled
                  className="margin-y-0 margin-x-2"
                  onClick={() => markAllAsRead().then(() => refetch())}
                >
                  {notificationsT('index.markAllAsRead')}
                </Button>
              )}

              <UswdsReactLink
                className="margin-y-0 margin-x-2"
                to="/notifications/settings"
              >
                {notificationsT('index.notificationSettings')}
              </UswdsReactLink>
            </div>
          </Grid>

          {loading && (
            <Spinner
              size="large"
              center
              aria-valuetext={generalT('pageLoading')}
              aria-busy
            />
          )}

          {allNotifications?.length === 0 && (
            <Alert type="info" slim headingLevel="h3">
              {notificationsT('index.infoBanner.emptyState')}
            </Alert>
          )}

          <div className="margin-bottom-4">
            {allNotifications?.length !== 0 &&
              currentNotifications?.map((notification, index) => (
                <IndividualNotification
                  {...notification}
                  key={notification.id}
                  index={index}
                />
              ))}
          </div>

          {pageCount > 1 && (
            <ReactPaginate
              data-testid="notification-pagination"
              breakLabel="..."
              breakClassName="usa-pagination__item usa-pagination__overflow"
              nextLabel="Next >"
              containerClassName="mint-pagination usa-pagination usa-pagination__list"
              previousLinkClassName={
                pageOffset === 0
                  ? 'display-none'
                  : 'usa-pagination__link usa-pagination__previous-page prev-page'
              }
              nextLinkClassName={
                pageOffset / itemsPerPage === pageCount - 1
                  ? 'display-none'
                  : 'usa-pagination__link usa-pagination__previous-page next-page'
              }
              disabledClassName="pagination__link--disabled"
              activeClassName="usa-current"
              activeLinkClassName="usa-current"
              pageClassName="usa-pagination__item"
              pageLinkClassName="usa-pagination__button"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Previous"
            />
          )}
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default NotificationsHome;
