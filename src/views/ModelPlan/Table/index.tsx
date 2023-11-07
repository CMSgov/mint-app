/* eslint-disable react/prop-types */

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Column,
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';
import { useQuery } from '@apollo/client';
import {
  Button,
  IconComment,
  IconStar,
  IconStarOutline,
  Table as UswdsTable
} from '@trussworks/react-uswds';
import classNames from 'classnames';
import { TeamRole } from 'gql/gen/graphql';
import i18next from 'i18next';

import UswdsReactLink from 'components/LinkWrapper';
import PageLoading from 'components/PageLoading';
import Alert from 'components/shared/Alert';
import GlobalClientFilter from 'components/TableFilter';
import TablePagination from 'components/TablePagination';
import TableResults from 'components/TableResults';
import GetAllModelPlans from 'queries/GetModelPlans';
import {
  GetModelPlans as GetAllModelPlansType,
  GetModelPlans_modelPlanCollection as AllModelPlansType,
  GetModelPlans_modelPlanCollection_collaborators as CollaboratorsType,
  GetModelPlans_modelPlanCollection_crTdls as CRTDLType
} from 'queries/types/GetModelPlans';
import {
  KeyCharacteristic,
  ModelCategory,
  ModelPlanFilter
} from 'types/graphql-global-types';
import { formatDateLocal, formatDateUtc } from 'utils/date';
import CsvExportLink from 'utils/export/CsvExportLink';
import globalFilterCellText from 'utils/globalFilterCellText';
import {
  currentTableSortDescription,
  getColumnSortStatus,
  getHeaderSortIcon,
  sortColumnValues
} from 'utils/tableSort';
import { UpdateFavoriteProps } from 'views/ModelPlan/ModelPlanOverview';

type ModelPlansTableProps =
  | {
      type: 'home' | 'mac';
      updateFavorite?: never;
      hiddenColumns?: number[]; // indexes of columns to be hidden
      hideTable?: (tableHidden: boolean) => void;
      tableHidden?: boolean;
      userModels: boolean;
      isAssessment: boolean;
      isMAC: boolean;
    }
  | {
      type: 'models';
      updateFavorite: (modelPlanID: string, type: UpdateFavoriteProps) => void;
      hiddenColumns?: number[]; // indexes of columns to be hidden
      hideTable?: never;
      tableHidden?: never;
      userModels?: never;
      isAssessment?: never;
      isMAC?: never;
    };

const ModelPlansTable = ({
  type,
  updateFavorite,
  hiddenColumns,
  hideTable,
  tableHidden,
  userModels,
  isAssessment,
  isMAC
}: ModelPlansTableProps) => {
  const { t: homeT } = useTranslation('home');

  let queryType = ModelPlanFilter.COLLAB_ONLY;

  if (!userModels && !isMAC) {
    queryType = ModelPlanFilter.INCLUDE_ALL;
  } else if (isMAC) {
    queryType = ModelPlanFilter.WITH_CR_TDLS;
  }

  const { data: modelPlans, loading, error } = useQuery<GetAllModelPlansType>(
    GetAllModelPlans,
    {
      variables: {
        filter: queryType,
        isMAC: type !== 'home'
      }
    }
  );

  const data = useMemo(() => {
    return (modelPlans?.modelPlanCollection ?? []) as AllModelPlansType[];
  }, [modelPlans?.modelPlanCollection]);

  const columns = useMemo(() => {
    const homeColumns: string[] = [
      'modelName',
      'abbreviation',
      'amsModelID',
      'modelCategory',
      'status',
      'clearanceDate',
      'startDate',
      'recentActivity'
    ];

    const tableColumns: Record<string, string[]> = {
      home: [...homeColumns],
      models: ['isFavorite', ...homeColumns],
      mac: [
        'modelName',
        'status',
        'startDate',
        'paymentDate',
        'keyCharacteristics',
        'demoCode',
        'crTdls',
        'modelPoc'
      ]
    };

    const columnOptions: Record<string, Column> = {
      isFavorite: {
        id: 'isFavorite',
        Header: <IconStarOutline size={3} />,
        accessor: 'isFavorite',
        disableGlobalFilter: true,
        Cell: ({ row }: { row: Row<AllModelPlansType> }) => {
          return row.original.isFavorite ? (
            <button
              onClick={() =>
                updateFavorite?.(row.original.id, 'removeFavorite')
              }
              type="button"
              role="checkbox"
              data-testid={`${row.original.modelName}-favorite`}
              className="usa-button usa-button--unstyled display-block"
              aria-label={`Click to unfavorite ${row.original.modelName} model plan`}
              aria-checked="true"
            >
              <IconStar data-cy="favorited" size={3} />
            </button>
          ) : (
            <button
              onClick={() => updateFavorite?.(row.original.id, 'addFavorite')}
              type="button"
              role="checkbox"
              data-testid={`${row.original.modelName}-unfavorite`}
              className="usa-button usa-button--unstyled display-block"
              aria-label={`Click to favorite ${row.original.modelName} model plan`}
              aria-checked="false"
            >
              <IconStarOutline
                data-cy="unfavorited"
                size={3}
                className="text-gray-30"
              />
            </button>
          );
        }
      },
      modelName: {
        id: 'modelName',
        Header: homeT<string>('requestsTable.headers.name'),
        accessor: 'modelName',
        Cell: ({ row, value }: any) => {
          const filteredNameHistory: string[] = row.original.nameHistory?.slice(
            1
          );
          return (
            <>
              <UswdsReactLink
                to={`/models/${row.original.id}/${
                  type === 'models' ? 'read-only/model-basics' : 'task-list'
                }`}
              >
                {value}
              </UswdsReactLink>
              {filteredNameHistory && filteredNameHistory.length > 0 && (
                <RenderFilteredNameHistory names={filteredNameHistory} />
              )}
            </>
          );
        }
      },
      abbreviation: {
        id: 'abbreviation',
        Header: homeT<string>('requestsTable.headers.abbreviation'),
        accessor: 'abbreviation'
      },
      amsModelID: {
        id: 'amsModelID',
        Header: homeT<string>('requestsTable.headers.amsModelID'),
        accessor: 'basics.amsModelID'
      },
      modelCategory: {
        id: 'modelCategory',
        Header: homeT<string>('requestsTable.headers.category'),
        accessor: 'basics.modelCategory',
        Cell: ({ row, value }: any) => {
          const additionalModelCategory =
            row.original.basics.additionalModelCategories;

          // Handle no value with an early return
          if (!value) {
            return <div>{homeT<string>('requestsTable.tbd')}</div>;
          }

          if (additionalModelCategory.length !== 0) {
            const newArray = additionalModelCategory.map(
              (group: ModelCategory) => {
                return i18next.t<string>(
                  `basics:additionalModelCategories.options.${group}`
                );
              }
            );

            return `${i18next.t<string>(
              `basics:modelCategory.options.${value}`
            )}, ${newArray.join(', ')}`;
          }
          return i18next.t<string>(`basics:modelCategory.options.${value}`);
        }
      },
      status: {
        id: 'status',
        Header: homeT<string>('requestsTable.headers.status'),
        accessor: ({ status }: any) => {
          return i18next.t<string>(`modelPlan:status.options.${status}`);
        },
        Cell: ({ value }: any) => {
          return value;
        }
      },
      clearanceDate: {
        id: 'clearanceDate',
        Header: homeT<string>('requestsTable.headers.clearanceDate'),
        accessor: ({ basics: { clearanceStarts } }: any) => {
          if (clearanceStarts) {
            return formatDateUtc(clearanceStarts, 'MM/dd/yyyy');
          }
          return null;
        },
        Cell: ({ value }: { value: string }) => {
          if (!value) {
            return <div>{homeT<string>('requestsTable.tbd')}</div>;
          }
          return value;
        }
      },
      startDate: {
        id: 'startDate',
        Header: homeT<string>('requestsTable.headers.startDate'),
        accessor: ({ basics: { performancePeriodStarts } }: any) => {
          if (performancePeriodStarts) {
            return formatDateUtc(performancePeriodStarts, 'MM/dd/yyyy');
          }
          return null;
        },
        Cell: ({ value }: any) => {
          if (!value) {
            return <div>{homeT<string>('requestsTable.tbd')}</div>;
          }
          return value;
        }
      },
      recentActivity: {
        id: 'recentActivity',
        Header: homeT<string>('requestsTable.headers.recentActivity'),
        accessor: 'modifiedDts',
        Cell: ({ row, value }: any) => {
          const { discussions } = row.original;
          const formattedUpdatedDate = `${homeT(
            'requestsTable.updated'
          )} ${formatDateLocal(
            value || row.original.createdDts,
            'MM/dd/yyyy'
          )}`;
          return (
            <>
              {formattedUpdatedDate}
              {discussions.length > 0 && (
                <div className="display-flex flex-align-center text-bold">
                  <IconComment className="text-primary margin-right-05" />{' '}
                  {discussions.length}{' '}
                  {i18next.t('discussions:discussionBanner.discussion', {
                    count: discussions.length
                  })}
                </div>
              )}
            </>
          );
        }
      },
      paymentDate: {
        id: 'paymentDate',
        Header: homeT<string>('requestsTable.headers.paymentDate'),
        accessor: ({ payments: { paymentStartDate } }: any) => {
          if (paymentStartDate) {
            return formatDateUtc(paymentStartDate, 'MM/dd/yyyy');
          }
          return null;
        },
        Cell: ({ value }: { value: string | null }) => {
          if (!value) {
            return <div>{homeT<string>('requestsTable.tbd')}</div>;
          }
          return value;
        }
      },
      keyCharacteristics: {
        id: 'keyCharacteristics',
        Header: homeT<string>('requestsTable.headers.keyCharacteristics'),
        accessor: 'generalCharacteristics.keyCharacteristics',
        Cell: ({ value }: { value: KeyCharacteristic[] }) => {
          if (value) {
            return value
              .map(characteristics => {
                return i18next.t<string>(
                  `generalCharacteristics:keyCharacteristics.options.${characteristics}`
                );
              })
              .join(', ');
          }
          return null;
        }
      },
      demoCode: {
        id: 'demoCode',
        Header: homeT<string>('requestsTable.headers.demoCode'),
        accessor: 'basics.demoCode'
      },
      crTdls: {
        id: 'crTdls',
        Header: homeT<string>('requestsTable.headers.crTDLs'),
        accessor: 'crTdls',
        Cell: ({ value }: { value: CRTDLType[] }) => {
          if (!value || value.length === 0) {
            return <div>{homeT<string>('requestsTable.tbd')}</div>;
          }
          const crtdlIDs = value
            .map((crtdl: CRTDLType) => crtdl.idNumber)
            .join(', ');
          return crtdlIDs;
        }
      },
      modelPoc: {
        id: 'modelPoc',
        Header: homeT<string>('requestsTable.headers.modelPoc'),
        accessor: 'collaborators',
        Cell: ({ value }: any) => {
          if (value) {
            const leads = value.filter((item: CollaboratorsType) => {
              return item.teamRoles.includes(TeamRole.MODEL_LEAD);
            });
            return (
              <>
                {leads.map((item: CollaboratorsType, index: number) => {
                  return `${item.userAccount.commonName}${
                    index === leads.length - 1 ? '' : ', '
                  }`;
                })}
              </>
            );
          }
          return '';
        }
      }
    };

    const columnList: any = [...tableColumns[type]].map(
      column => columnOptions[column]
    );

    return columnList;
  }, [homeT, updateFavorite, type]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    page,
    setGlobalFilter,
    state,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      sortTypes: {
        alphanumeric: (rowOne, rowTwo, columnName) => {
          return sortColumnValues(
            rowOne.values[columnName],
            rowTwo.values[columnName]
          );
        }
      },
      globalFilter: useMemo(() => globalFilterCellText, []),
      autoResetSortBy: false,
      // Resets to page 1 upon client global filtering.  False value if changing/filtering your data externally
      autoResetPage: true,
      initialState: {
        sortBy: useMemo(() => [{ id: 'modelName', asc: true }], []),
        pageIndex: 0
      }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Checking if the table is for Assessment and if they have no associated models
  // If so, do not render the table at all
  useEffect(() => {
    if (!loading && isAssessment && userModels && data.length === 0) {
      if (hideTable) hideTable(true);
    }
  }, [loading, isAssessment, userModels, data, hideTable]);

  if (tableHidden) {
    return null;
  }

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert type="error">{homeT<string>('fetchError')}</Alert>;
  }

  if (data.length === 0) {
    return (
      <Alert type="info" heading={homeT<string>('requestsTable.empty.heading')}>
        {homeT<string>('requestsTable.empty.body')}
      </Alert>
    );
  }

  rows.map(row => prepareRow(row));

  const homeStyle = (index: number) => {
    return {
      minWidth:
        (index === 0 && '170px') ||
        (index === 2 && '100px') ||
        (index === 1 && '110px') ||
        '138px',
      paddingLeft: '0'
    };
  };

  const modelsStyle = (index: number) => {
    return {
      minWidth:
        (type === 'models' && index === 0 && '50px') ||
        (type === 'models' && index === 2 && '100px') ||
        (type === 'models' && index === 3 && '100px') ||
        '138px',
      padding: index === 0 ? '0' : 'auto',
      paddingTop: index === 0 ? '0rem' : 'auto',
      paddingLeft: '0',
      paddingBottom: index === 0 ? '0rem' : '.5rem'
    };
  };

  return (
    <div className="model-plan-table">
      <div className="mint-header__basic">
        {!userModels && (
          <GlobalClientFilter
            setGlobalFilter={setGlobalFilter}
            tableID={homeT<string>('requestsTable.id')}
            tableName={homeT<string>('requestsTable.title')}
            className="margin-bottom-4"
          />
        )}

        {isAssessment && !userModels && (
          <div className="flex-align-self-center">
            <CsvExportLink />
          </div>
        )}
      </div>

      {!userModels && (
        <TableResults
          globalFilter={state.globalFilter}
          pageIndex={state.pageIndex}
          pageSize={state.pageSize}
          filteredRowLength={page.length}
          rowLength={data.length}
          className="margin-bottom-4"
        />
      )}

      <UswdsTable {...getTableProps()} fullWidth scrollable>
        <caption className="usa-sr-only">
          {homeT<string>('requestsTable.caption')}
        </caption>

        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                // @ts-ignore
                .filter((column, index) => !hiddenColumns?.includes(index))
                .map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    aria-sort={getColumnSortStatus(column)}
                    className="table-header"
                    scope="col"
                    style={
                      type === 'models' ? modelsStyle(index) : homeStyle(index)
                    }
                  >
                    <button
                      className={classNames(
                        'usa-button usa-button--unstyled position-relative',
                        {
                          'margin-top-1': index === 0
                        }
                      )}
                      type="button"
                      {...column.getSortByToggleProps()}
                    >
                      {column.render('Header')}
                      {getHeaderSortIcon(column, index === 0)}
                    </button>
                  </th>
                ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            return (
              <tr {...row.getRowProps()}>
                {row.cells
                  .filter((cell, index) => {
                    // @ts-ignore
                    return !hiddenColumns?.includes(index);
                  })
                  .map((cell, i) => {
                    if (i === 0) {
                      return (
                        <th
                          {...cell.getCellProps()}
                          scope="row"
                          style={{
                            paddingLeft: '0',
                            borderBottom: 'auto'
                          }}
                        >
                          {cell.render('Cell')}
                        </th>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          paddingLeft: '0',
                          borderBottom: 'auto',
                          whiteSpace: 'normal'
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </UswdsTable>

      {state.globalFilter && page.length === 0 && (
        <Alert
          type="warning"
          aria-live="polite"
          heading={homeT<string>('allModels.noResults.heading', {
            searchTerm: state.globalFilter
          })}
        >
          {homeT<string>('allModels.noResults.subheading')}
        </Alert>
      )}

      {!userModels && (
        <TablePagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageIndex={state.pageIndex}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          pageCount={pageCount}
          pageSize={state.pageSize}
          setPageSize={setPageSize}
          page={[]}
        />
      )}

      <div
        className="usa-sr-only usa-table__announcement-region"
        aria-live="polite"
      >
        {currentTableSortDescription(headerGroups[0])}
      </div>
    </div>
  );
};

const RenderFilteredNameHistory = ({ names }: { names: string[] }) => {
  const { t } = useTranslation('home');
  const [isShowingAllNames, setShowAllNames] = useState(false);

  const firstThreeNames = names.slice(0, 3);

  return (
    <>
      <p className="margin-y-0 font-body-xs line-height-sans-2">
        {t('previously')}{' '}
        {isShowingAllNames
          ? `${names.join(', ')}`
          : `${firstThreeNames.join(', ')}`}
      </p>
      {names.length > 3 && (
        <Button
          unstyled
          type="button"
          className="margin-top-1 font-body-xs"
          onClick={() => {
            setShowAllNames(!isShowingAllNames);
          }}
        >
          {isShowingAllNames
            ? t('viewLess')
            : t('viewMore', { number: `${names.length - 3}` })}
        </Button>
      )}
    </>
  );
};

export default ModelPlansTable;
