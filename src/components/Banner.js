import React from 'react';
import { Link } from'react-router-dom';
import { useTranslation } from'react-i18next';

const Banner = () => {
	const { t } = useTranslation();
  return (
    <div className="banner">
      <h1>{t('')}</h1>
      <p>{t('')}</p>
      <Link to="/view-menu" className="btn btn-primary">{t('View Menu')}</Link>
      <Link to="/book-table" className="btn btn-primary">{t('Book Table')}</Link>
    </div>
  );
};

export default Banner;


