import React from 'react';
import { CardGroup } from '@trussworks/react-uswds';

import ArticleCard from 'components/ArticleCard';

import helpAndKnowledgeArticles from '../..';

type HelpCardGroupType = {
  className?: string;
  filter?: string;
};

const HelpCardGroup = ({ className, filter }: HelpCardGroupType) => {
  const articles = filter
    ? helpAndKnowledgeArticles.filter(article => article.tag === filter)
    : helpAndKnowledgeArticles;

  return (
    <CardGroup className={className}>
      {articles.map(article => (
        <ArticleCard
          key={article.route}
          {...article}
          isLink
          tag={article.tag}
        />
      ))}
    </CardGroup>
  );
};

export default HelpCardGroup;
