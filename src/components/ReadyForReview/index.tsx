import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SummaryBox } from '@trussworks/react-uswds';
import { Field } from 'formik';

import CheckboxField from 'components/shared/CheckboxField';
import FieldGroup from 'components/shared/FieldGroup';
import { TaskStatus, TaskStatusInput } from 'types/graphql-global-types';
import { formatDate } from 'utils/date';

type ReadyForReviewType = {
  id: string;
  field: string;
  sectionName: string;
  status: TaskStatus;
  setFieldValue: (field: string, value: any) => void;
  readyForReviewBy: string | null;
  readyForReviewDts: string | null;
};

const ReadyForReview = ({
  id,
  field,
  sectionName,
  status,
  setFieldValue,
  readyForReviewBy,
  readyForReviewDts
}: ReadyForReviewType) => {
  const { t } = useTranslation('draftModelPlan');
  return (
    <FieldGroup className="margin-top-8 margin-bottom-3">
      <SummaryBox heading="" className="bg-white border-base-light padding-2">
        <p className="margin-0">{t('modelPlanStatus')}</p>
        <Field
          as={CheckboxField}
          id={id}
          data-testid={id}
          name={field}
          label={t('modelPlanCopy', {
            sectionName: `${sectionName}`
          })}
          checked={status === TaskStatus.READY_FOR_REVIEW}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
              setFieldValue('status', TaskStatusInput.READY_FOR_REVIEW);
            } else {
              setFieldValue('status', TaskStatusInput.IN_PROGRESS);
            }
          }}
        />
        {readyForReviewBy && readyForReviewDts && (
          <p className="margin-top-1 margin-bottom-0 margin-left-4 text-base">
            {t('markedReady', {
              reviewer: `${readyForReviewBy}`
            })}
            {formatDate(readyForReviewDts, 'M/d/yyyy')}
          </p>
        )}
      </SummaryBox>
    </FieldGroup>
  );
};

export default ReadyForReview;
