import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Grid, GridContainer } from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';

import MainContent from 'components/MainContent';
import UpdateNDA from 'queries/NDA/UpdateNDA';
import { setUser } from 'reducers/authReducer';

type NDAType = {
  agreed: boolean;
};

const NDA = () => {
  const { t } = useTranslation('nda');
  const dispatch = useDispatch();
  const history = useHistory();
  const { acceptedNDA, ...user } = useSelector(
    (state: RootStateOrAny) => state.auth
  );

  const [signNDA] = useMutation(UpdateNDA);

  const handleFormSubmit = (formikValues: NDAType) => {
    signNDA().then(response => {
      dispatch(setUser({ ...user, acceptedNDA: response?.data?.agreeToNDA }));
      history.push('/');
    });
  };

  return (
    <MainContent>
      <GridContainer>
        <Grid desktop={{ col: 9 }}>
          <h1>{t('header')}</h1>
          <p className="line-height-body-6">{t('body')}</p>
          <Formik
            initialValues={{ agreed: false }}
            onSubmit={values => {
              handleFormSubmit(values);
            }}
            enableReinitialize
          >
            {(formikProps: FormikProps<NDAType>) => {
              const { values, handleSubmit } = formikProps;

              return (
                <Form
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <Field
                    as={Checkbox}
                    id="nda-check"
                    name="agreed"
                    className="margin-bottom-4"
                    label={t('label')}
                  />

                  <Button type="submit" disabled={!values.agreed}>
                    {t('submit')}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default NDA;
