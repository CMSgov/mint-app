import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Button, Table as UswdsTable } from '@trussworks/react-uswds';
import { DateTime } from 'luxon';

import Modal from 'components/Modal';
import PageHeading from 'components/PageHeading';
import PageLoading from 'components/PageLoading';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import DeleteModelPlanDocument from 'queries/Documents/DeleteModelPlanDocument';
import GetPlanDocumentByModelID from 'queries/Documents/GetPlanDocumentByModelID';
import GetPlanDocumentDownloadURL from 'queries/Documents/GetPlanDocumentDownloadURL';
import { DeleteModelPlanDocumentVariables } from 'queries/Documents/types/DeleteModelPlanDocument';
import {
  GetModelPlanDocumentByModelID as GetModelPlanDocumentByModelIDType,
  GetModelPlanDocumentByModelID_readPlanDocumentByModelID as PlanDocumentByModelIDType
} from 'queries/Documents/types/GetModelPlanDocumentByModelID';
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
  setDocumentMessage: (value: string) => void;
  setDocumentStatus: (value: DocumentStatusType) => void;
};

type DocumentStatusType = 'success' | 'error';

const PlanDocumentsTable = ({
  hiddenColumns,
  modelID,
  setDocumentMessage,
  setDocumentStatus
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
      setDocumentMessage={setDocumentMessage}
      setDocumentStatus={setDocumentStatus}
    />
  );
};

export default PlanDocumentsTable;

type TableProps = {
  data: PlanDocumentByModelIDType[];
  hiddenColumns?: string[];
  refetch: () => any | undefined;
  setDocumentMessage: (value: string) => void;
  setDocumentStatus: (value: DocumentStatusType) => void;
};

const Table = ({
  data,
  hiddenColumns,
  refetch,
  setDocumentMessage,
  setDocumentStatus
}: TableProps) => {
  const { t } = useTranslation('documents');
  const client = useApolloClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileToRemove, setFileToRemove] = useState<PlanDocumentByModelIDType>(
    {} as PlanDocumentByModelIDType
  );

  const [mutate] = useMutation<DeleteModelPlanDocumentVariables>(
    DeleteModelPlanDocument
  );

  const handleDelete = useMemo(() => {
    return (file: PlanDocumentByModelIDType) => {
      mutate({
        variables: {
          // TODO - update inout variables pending BE changes to delete by ID only
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
            setDocumentMessage(
              t('removeDocumentFail', {
                documentName: file.fileName
              })
            );
            setDocumentStatus('error');
          } else {
            setDocumentMessage(
              t('removeDocumentSuccess', {
                documentName: file.fileName
              })
            );
            setDocumentStatus('success');
            refetch();
          }
        })
        .catch(() => {
          setDocumentMessage(
            t('removeDocumentFail', {
              documentName: file.fileName
            })
          );
          setDocumentStatus('error');
        });
    };
  }, [mutate, refetch, t, setDocumentMessage, setDocumentStatus]);

  const renderModal = () => {
    return (
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <PageHeading headingLevel="h2" className="margin-top-0">
          {t('removeDocumentModal.header', {
            documentName: fileToRemove.fileName
          })}
        </PageHeading>
        <p>{t('removeDocumentModal.warning')}</p>
        <Button
          type="button"
          className="margin-right-4"
          onClick={() => handleDelete(fileToRemove)}
        >
          {t('removeDocumentModal.confirm')}
        </Button>
        <Button type="button" unstyled onClick={() => setModalOpen(false)}>
          {t('removeDocumentModal.cancel')}
        </Button>
      </Modal>
    );
  };

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
          if (error) {
            setDocumentMessage(error);
            setDocumentStatus('error');
          }
        });
    };
  }, [client, setDocumentMessage, setDocumentStatus]);

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
                  onClick={() => {
                    setModalOpen(true);
                    setFileToRemove(row.original);
                  }}
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
  }, [t, handleDownload]);

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
      {renderModal()}
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
