import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Button, Table as UswdsTable } from '@trussworks/react-uswds';
import { DateTime } from 'luxon';

import PageLoading from 'components/PageLoading';
import Alert from 'components/shared/Alert';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import DeleteModelPlanDocument from 'queries/DeleteModelPlanDocument';
import GetPlanDocumentByModelID from 'queries/GetPlanDocumentByModelID';
import GetPlanDocumentDownloadURL from 'queries/GetPlanDocumentDownloadURL';
import { DeleteModelPlanDocumentVariables } from 'queries/types/DeleteModelPlanDocument';
import {
  GetModelPlanDocumentByModelID as GetModelPlanDocumentByModelIDType,
  GetModelPlanDocumentByModelID_readPlanDocumentByModelID as PlanDocumentByModelIDType
} from 'queries/types/GetModelPlanDocumentByModelID';
import downloadFile from 'utils/downloadFile';
import globalTableFilter from 'utils/globalTableFilter';
import { translateDocumentType } from 'utils/modelPlan';
import {
  currentTableSortDescription,
  getColumnSortStatus,
  getHeaderSortIcon,
  sortColumnValues
} from 'utils/tableSort';

type PlanDocumentsTableProps = {
  hiddenColumns?: string[];
  modelID: string;
};

const PlanDocumentsTable = ({
  hiddenColumns,
  modelID
}: PlanDocumentsTableProps) => {
  const { t } = useTranslation('documents');
  const {
    error,
    loading,
    data: documents,
    refetch: refetchDocuments
  } = useQuery<GetModelPlanDocumentByModelIDType>(GetPlanDocumentByModelID, {
    variables: {
      id: modelID
    }
  });

  const data = (documents?.readPlanDocumentByModelID ??
    []) as PlanDocumentByModelIDType[];

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <ErrorAlert
        testId="formik-validation-errors"
        classNames="margin-top-3"
        heading={t('documentTable.error.heading')}
      >
        <ErrorAlertMessage
          errorKey="error-document"
          message={t('documentTable.error.body')}
        />
      </ErrorAlert>
    );
  }

  return (
    <Table
      data={data}
      hiddenColumns={hiddenColumns}
      refetch={refetchDocuments}
    />
  );
};

export default PlanDocumentsTable;

type TableProps = {
  data: PlanDocumentByModelIDType[];
  hiddenColumns?: string[];
  refetch: () => any | undefined;
};

const Table = ({ data, hiddenColumns, refetch }: TableProps) => {
  const { t } = useTranslation('documents');
  const [documentError, setDocumentError] = useState();
  const client = useApolloClient();

  const [mutate] = useMutation<DeleteModelPlanDocumentVariables>(
    DeleteModelPlanDocument
  );

  const handleDelete = useMemo(() => {
    return (file: PlanDocumentByModelIDType) => {
      mutate({
        variables: {
          input: {
            id: file.id,
            modelPlanID: file.modelPlanID,
            documentParameters: {
              fileSize: file.fileSize
            },
            url: ''
          }
        }
      })
        .then(response => {
          if (response?.errors) {
            setDocumentError(t('removeDocumentFail'));
          } else {
            refetch();
          }
        })
        .catch(() => {
          setDocumentError(t('removeDocumentFail'));
        });
    };
  }, [mutate, refetch, t]);

  const handleDownload = useMemo(() => {
    return (file: PlanDocumentByModelIDType) => {
      if (!file.fileName || !file.fileType) return;
      downloadFile({
        client,
        fileID: file.id,
        fileType: file.fileType,
        fileName: file.fileName,
        query: GetPlanDocumentDownloadURL,
        queryType: 'planDocumentDownloadURL',
        urlKey: 'presignedURL'
      })
        .then((downloadURL: string) => {}) // TODO: Returning download URL for cypress testing
        .catch((error: any) => {
          if (error) setDocumentError(error);
        });
    };
  }, [client]);

  const columns = useMemo(() => {
    return [
      {
        Header: t('documentTable.name'),
        accessor: 'fileName'
      },
      {
        Header: t('documentTable.type'),
        accessor: 'documentType',
        Cell: ({ row, value }: any) => {
          if (value !== 'OTHER') {
            return translateDocumentType(value);
          }
          return row.original.otherType;
        }
      },
      {
        Header: t('documentTable.notes'),
        accessor: 'optionalNotes'
      },
      {
        Header: t('documentTable.uploadDate'),
        accessor: 'createdDts',
        Cell: ({ value }: any) => {
          return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT);
        }
      },
      {
        Header: t('documentTable.actions'),
        accessor: 'virusScanned',
        Cell: ({ row, value }: any) => {
          if (value) {
            return row.original.virusClean ? (
              <>
                <Button
                  type="button"
                  unstyled
                  className="margin-right-1"
                  onClick={() => handleDownload(row.original)}
                >
                  {t('documentTable.view')}
                </Button>
                <Button
                  type="button"
                  unstyled
                  className="text-red"
                  data-testid="remove-document"
                  onClick={() => handleDelete(row.original)}
                >
                  {t('documentTable.remove')}
                </Button>
              </>
            ) : (
              t('documentTable.virusFound')
            );
          }
          return t('documentTable.scanInProgress');
        }
      }
    ];
  }, [t, handleDownload, handleDelete]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
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
      globalFilter: useMemo(() => globalTableFilter, []),
      autoResetSortBy: false,
      autoResetPage: false,
      initialState: {
        sortBy: useMemo(() => [{ id: 'modelName', asc: true }], []),
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="model-plan-table" data-testid="model-plan-documents-table">
      {documentError && (
        <Alert
          type="error"
          slim
          data-testid="mandatory-fields-alert"
          className="margin-y-4"
        >
          <span className="mandatory-fields-alert__text">{documentError}</span>
        </Alert>
      )}
      <UswdsTable bordered={false} {...getTableProps()} fullWidth scrollable>
        <caption className="usa-sr-only">{t('requestsTable.caption')}</caption>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                // @ts-ignore
                .filter(column => !hiddenColumns?.includes(column.Header))
                .map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    aria-sort={getColumnSortStatus(column)}
                    className="table-header"
                    scope="col"
                    style={{
                      minWidth: '138px',
                      paddingLeft: '0',
                      paddingBottom: '.5rem',
                      position: 'relative'
                    }}
                  >
                    <button
                      className="usa-button usa-button--unstyled"
                      type="button"
                      {...column.getSortByToggleProps()}
                    >
                      {column.render('Header')}
                      {getHeaderSortIcon(column)}
                    </button>
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells
                  .filter(cell => {
                    // @ts-ignore
                    return !hiddenColumns?.includes(cell.column.Header);
                  })
                  .map((cell, i) => {
                    if (i === 0) {
                      return (
                        <th
                          {...cell.getCellProps()}
                          scope="row"
                          style={{
                            paddingLeft: '0',
                            borderBottom:
                              index === page.length - 1 ? 'none' : 'auto'
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
                          borderBottom:
                            index === page.length - 1 ? 'none' : 'auto'
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

      <div
        className="usa-sr-only usa-table__announcement-region"
        aria-live="polite"
      >
        {currentTableSortDescription(headerGroups[0])}
      </div>

      {data.length === 0 && (
        <p data-testid="no-documents">{t('documentTable.noDocuments')}</p>
      )}
    </div>
  );
};
