import React from 'react';
import classnames from 'classnames';

type RequiredAsteriskType = {
  className?: string;
};

const RequiredAsterisk = ({ className }: RequiredAsteriskType) => {
  const classes = classnames('text-red margin-x-05', className);

  return (
    <span aria-label="(Field required)" className={classes}>
      *
    </span>
  );
};

export default RequiredAsterisk;
