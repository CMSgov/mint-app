import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Card } from '@trussworks/react-uswds';
import classNames from 'classnames';
import {
  AuditFieldChangeType,
  DatabaseOperation,
  GetChangeHistoryQuery,
  TranslationDataType
} from 'gql/gen/graphql';

import { AvatarCircle } from 'components/shared/Avatar';
import CollapsableLink from 'components/shared/CollapsableLink';
import { formatDateUtc, formatTime } from 'utils/date';

import {
  condenseLinkingTableChanges,
  connectedFields,
  documentName,
  documentType,
  documentUpdateType,
  getOperationalMetadata,
  getSolutionName,
  getSolutionOperationStatus,
  isLinkingTable,
  isOperationalSolutionWithMetaData,
  linkingTableQuestions
} from '../../util';
import { RenderChangeValue } from '../ChangeRecord';

import '../ChangeRecord/index.scss';

export type ChangeRecordType = NonNullable<
  GetChangeHistoryQuery['translatedAuditCollection']
>[0];

type ChangeRecordProps = {
  changeRecords: ChangeRecordType[];
};

type BatchChangeProps = {
  change: ChangeRecordType;
  connected: boolean;
};

// Render a single change record, showing the field name, the change type, and the old and new values
const BatchChanges = ({ change, connected }: BatchChangeProps) => {
  const { t } = useTranslation('changeHistory');

  let fieldsToMap: ChangeRecordType['translatedFields'][0][] =
    change.translatedFields;

  // If the change is connected to another table, only show the fields that are connected
  if (connected) {
    const connectedConfig = connectedFields.find(
      connection => connection.table === change.tableName
    );

    if (connectedConfig) {
      fieldsToMap = change.translatedFields.filter(field =>
        connectedConfig.fields.includes(field.fieldName)
      );
    }
  }

  // Get the action change, if it's a solution operation - check 'needed' value to get the correct action
  const databaseAction =
    change.tableName === 'operational_solution'
      ? getSolutionOperationStatus(change)
      : change.action;

  return (
    <div
      className={classNames('margin-bottom-2 margin-top-neg-05')}
      key={change.id}
    >
      <div className="margin-right-05">
        {/* Existing model link header */}
        {change.tableName === 'existing_model_link' &&
          (() => {
            return (
              <span className="text-bold">
                {change.metaData?.tableName}{' '}
                <span className="text-normal">
                  {t('auditUpdateType.UPDATE')}
                </span>
              </span>
            );
          })()}

        {/* Documents header */}
        {change.tableName === 'plan_document' &&
          (() => {
            // Remove the 'file_name' field from the fields to map - already in header, doesnt need to be in changes
            fieldsToMap = fieldsToMap.filter(
              field => field.fieldName !== 'file_name'
            );

            return (
              <Trans
                i18nKey="changeHistory:documentBatchUpdate"
                values={{
                  isLink: documentType(change),
                  action: t(`documentChangeType.${documentUpdateType(change)}`),
                  documentName: documentName(change) || 'Temp document',
                  toFrom: t(`toFrom.${databaseAction}`),
                  date: formatDateUtc(change.date, 'MMMM d, yyyy'),
                  time: formatTime(change.date)
                }}
                components={{
                  datetime: <span />,
                  bold: <span className="text-bold" />
                }}
              />
            );
          })()}

        {/* Document solution link header */}
        {change.tableName === 'plan_document_solution_link' && (
          <div className="text-bold">
            <Trans
              i18nKey="changeHistory:documentSolutionLinkUpdate"
              values={{
                action: t(`documentLinkType.${databaseAction}`),
                toFrom: t(`toFrom.${databaseAction}`),
                solutionName: getSolutionName(change),
                date: formatDateUtc(change.date, 'MMMM d, yyyy'),
                time: formatTime(change.date)
              }}
              components={{
                normal: <span className="text-normal" />
              }}
            />
          </div>
        )}

        {/* Operational solution header */}
        {change.tableName === 'operational_solution' &&
          (() => {
            const solutionName = getOperationalMetadata(
              'solution',
              change?.metaData,
              'solutionName'
            );

            const needName = getOperationalMetadata(
              'solution',
              change?.metaData,
              'needName'
            );

            // Remove the 'needed' field from the fields to map
            fieldsToMap = fieldsToMap.filter(
              field => field.fieldName !== 'needed'
            );

            // Added metadata fields as translated fields when the database method is DELETE
            fieldsToMap =
              change.metaData &&
              databaseAction === DatabaseOperation.DELETE &&
              isOperationalSolutionWithMetaData(change.metaData)
                ? [
                    {
                      __typename: 'TranslatedAuditField',
                      changeType: AuditFieldChangeType.REMOVED,
                      dataType: TranslationDataType.NUMBER,
                      fieldName: 'numberOfSubtasks',
                      fieldNameTranslated: 'Subtasks',
                      id: '1',
                      new: null,
                      newTranslated: null,
                      notApplicableQuestions: null,
                      old: change.metaData.numberOfSubtasks,
                      oldTranslated: change.metaData.numberOfSubtasks,
                      questionType: null,
                      referenceLabel: null
                    }
                  ]
                : fieldsToMap;

            return (
              <div className="text-bold">
                {needName}{' '}
                <span className="text-normal">
                  {t('solution')} {t(`auditUpdateType.${databaseAction}`)}
                </span>{' '}
                : {solutionName}
              </div>
            );
          })()}

        {/* Subtask header */}
        {change.tableName === 'operational_solution_subtask' &&
          (() => {
            const solutionName = getOperationalMetadata(
              'subtask',
              change?.metaData,
              'solutionName'
            );

            const needName = getOperationalMetadata(
              'subtask',
              change?.metaData,
              'needName'
            );

            const subtaskName = getOperationalMetadata(
              'subtask',
              change?.metaData,
              'subtaskName'
            );

            if (!fieldsToMap.find(field => field.fieldName === 'name')) {
              fieldsToMap.unshift({
                __typename: 'TranslatedAuditField',
                changeType: AuditFieldChangeType.UPDATED,
                dataType: TranslationDataType.STRING,
                fieldName: 'name',
                fieldNameTranslated: 'Subtask',
                id: '1',
                new: null,
                newTranslated: subtaskName,
                notApplicableQuestions: null,
                old: null,
                oldTranslated: null,
                questionType: null,
                referenceLabel: null
              });
            }

            return (
              <Trans
                i18nKey="changeHistory:subtaskUpdate"
                values={{
                  action: t(`auditUpdateType.${change.action}`),
                  forFrom: t(`forFrom.${change.action}`),
                  needName,
                  solutionName
                }}
                components={{
                  datetime: <span />,
                  bold: <span className="text-bold" />
                }}
              />
            );
          })()}
      </div>

      {/* Render the fields that were changed */}
      <div className="change-record__answer margin-y-1">
        {(() => {
          // If the table is a linking table, show the fields in a list
          if (isLinkingTable(change.tableName)) {
            return (
              <ul className="padding-left-3">
                {fieldsToMap.map(field => (
                  <li>
                    {t(`linkUpdateType.${field.newTranslated}`)}:{' '}
                    {field.fieldNameTranslated}
                  </li>
                ))}
              </ul>
            );
          }

          return fieldsToMap.map(field => (
            <div key={field.id}>
              {field.newTranslated && (
                <span>{field.fieldNameTranslated}: </span>
              )}

              <RenderChangeValue
                value={field.newTranslated}
                dataType={field.dataType}
                referenceLabel={field.referenceLabel}
                questionType={field.questionType}
              />
            </div>
          ));
        })()}

        {/* Render previous details/values */}
        {(() => {
          // If the table is a linking table, don't show previous details
          if (isLinkingTable(change.tableName)) return <></>;

          return (
            <>
              {/* If the database action is not DELETE and there are fields with old values, show the previous details header */}
              {databaseAction !== DatabaseOperation.DELETE &&
                !!fieldsToMap.find(field => field.old) && (
                  <div className="text-bold padding-y-105">
                    {t('previousDetails')}
                  </div>
                )}

              {fieldsToMap.map(field => {
                if (!field.old) return <div key={field.id} />;

                return (
                  <div key={field.id}>
                    {field.old && (
                      <>
                        <span>{field.fieldNameTranslated}: </span>
                        <RenderChangeValue
                          value={field.oldTranslated}
                          dataType={field.dataType}
                          referenceLabel={field.referenceLabel}
                          questionType={field.questionType}
                          previous={!!field.old}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </>
          );
        })()}
      </div>
    </div>
  );
};

// Render a single change record, showing the actor, the date, and the fields that were changed
const BatchRecord = ({ changeRecords }: ChangeRecordProps) => {
  const { t } = useTranslation('changeHistory');

  const [isOpen, setOpen] = useState<boolean>(false);

  // Use solution document link as the table name if it's a batch of solution document links
  const isSolutionDocumentLinkBatch: boolean = !!changeRecords.find(change => {
    return change.tableName === 'plan_document_solution_link';
  });

  // Use the first table name in the batch as the table name, unless it's a batch of solution document links
  const tableName: string = isSolutionDocumentLinkBatch
    ? 'plan_document_solution_link'
    : changeRecords[0].tableName;

  // If the table is a linking table, condense the changes to show only the relevant fields
  const batchRecords = isLinkingTable(tableName)
    ? condenseLinkingTableChanges(changeRecords)
    : changeRecords;

  return (
    <Card className="change-record">
      <div className={classNames('display-flex flex-align-center')}>
        <AvatarCircle
          user={changeRecords[0].actorName}
          className="margin-right-1 flex-align-self-start"
        />
        <span className={classNames('padding-top-05')}>
          <span className="text-bold">{changeRecords[0].actorName} </span>

          <Trans
            i18nKey="changeHistory:change"
            count={changeRecords.length}
            values={{
              count: isLinkingTable(tableName)
                ? linkingTableQuestions(changeRecords).length
                : changeRecords.length,
              section: t(`sections.${tableName}`),
              date: formatDateUtc(changeRecords[0].date, 'MMMM d, yyyy'),
              time: formatTime(changeRecords[0].date)
            }}
            components={{
              datetime: <span />
            }}
          />
        </span>
      </div>

      {!isOpen && (
        <ul className="margin-top-1 margin-bottom-1 margin-left-4">
          {batchRecords.map(change => (
            <li key={change.id}>
              {/* Existing link audits */}
              {tableName === 'existing_model_link' &&
                (() => {
                  return <span>{change.metaData?.tableName}</span>;
                })()}

              {/* Document audits */}
              {change.tableName === 'plan_document' &&
                (() => {
                  return (
                    <Trans
                      i18nKey="changeHistory:documentBatchUpdate"
                      values={{
                        isLink: documentType(change),
                        action: t(
                          `documentChangeType.${documentUpdateType(change)}`
                        ),
                        documentName: documentName(change) || 'Temp document',
                        toFrom: t(`toFrom.${change.action}`),
                        date: formatDateUtc(change.date, 'MMMM d, yyyy'),
                        time: formatTime(change.date)
                      }}
                      components={{
                        datetime: <span />,
                        bold: <></>
                      }}
                    />
                  );
                })()}

              {/* Document solution link audits */}
              {change.tableName === 'plan_document_solution_link' && (
                <Trans
                  i18nKey="changeHistory:documentSolutionLinkUpdate"
                  values={{
                    action: t(`documentLinkType.${change.action}`),
                    toFrom: t(`toFrom.${change.action}`),
                    solutionName: getSolutionName(change),
                    date: formatDateUtc(change.date, 'MMMM d, yyyy'),
                    time: formatTime(change.date)
                  }}
                  components={{
                    normal: <></>
                  }}
                />
              )}

              {/* Operational solution audits */}
              {change.tableName === 'operational_solution' &&
                (() => {
                  const solutionName = getOperationalMetadata(
                    'solution',
                    change?.metaData,
                    'solutionName'
                  );

                  const needName = getOperationalMetadata(
                    'solution',
                    change?.metaData,
                    'needName'
                  );

                  return (
                    <Trans
                      i18nKey="changeHistory:solutionUpdate"
                      values={{
                        action: t(
                          `auditUpdateType.${getSolutionOperationStatus(
                            change
                          )}`
                        ),
                        needName,
                        solutionName
                      }}
                      components={{
                        datetime: <span />
                      }}
                    />
                  );
                })()}

              {/* Operational solution subtask audits */}
              {change.tableName === 'operational_solution_subtask' &&
                (() => {
                  const solutionName = getOperationalMetadata(
                    'subtask',
                    change?.metaData,
                    'solutionName'
                  );

                  const needName = getOperationalMetadata(
                    'subtask',
                    change?.metaData,
                    'needName'
                  );

                  return (
                    <Trans
                      i18nKey="changeHistory:subtaskUpdate"
                      values={{
                        action: t(`auditUpdateType.${change.action}`),
                        forFrom: t(`forFrom.${change.action}`),
                        needName,
                        solutionName
                      }}
                      components={{
                        datetime: <span />,
                        bold: <span className="text-normal" />
                      }}
                    />
                  );
                })()}
            </li>
          ))}
        </ul>
      )}

      <CollapsableLink
        className="margin-left-5"
        id={changeRecords[0].id}
        label={t('showDetails')}
        closeLabel={t('hideDetails')}
        labelPosition="bottom"
        setParentOpen={setOpen}
        styleLeftBar={false}
      >
        <div className="margin-bottom-neg-1">
          {batchRecords.map(change => (
            <BatchChanges
              change={change}
              connected={changeRecords.length > 1}
              key={change.id}
            />
          ))}
        </div>
      </CollapsableLink>
    </Card>
  );
};

export default BatchRecord;
