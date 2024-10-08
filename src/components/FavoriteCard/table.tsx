import React from 'react';
import { CardGroup } from '@trussworks/react-uswds';
import { UpdateFavoriteProps } from 'features/ModelPlan/ModelPlanOverview';
import { GetFavoritesQuery } from 'gql/generated/graphql';

import usePagination from 'hooks/usePagination';

import FavoriteCard from '.';

type FavoritesModelType = GetFavoritesQuery['modelPlanCollection'][0];

type ModelPlansTableProps = {
  favorites: FavoritesModelType[];
  removeFavorite: (modelPlanID: string, type: UpdateFavoriteProps) => void;
  toCollaborationArea?: boolean;
};

/**
 * Utilizing pagination if more than three favories
 * Possbility for sort functionality in future
 * */

const FavoritesCards = ({
  favorites,
  removeFavorite,
  toCollaborationArea = false
}: ModelPlansTableProps) => {
  const { currentItems, Pagination } = usePagination({
    items: favorites,
    itemsPerPage: 3
  });

  return (
    <div id="favorite-table">
      {currentItems.map(favorite => (
        <CardGroup key={favorite.id}>
          <FavoriteCard
            key={favorite.id}
            modelPlan={favorite}
            removeFavorite={removeFavorite}
            toCollaborationArea={toCollaborationArea}
          />
        </CardGroup>
      ))}

      {favorites.length > 3 && Pagination}
    </div>
  );
};

export default FavoritesCards;
