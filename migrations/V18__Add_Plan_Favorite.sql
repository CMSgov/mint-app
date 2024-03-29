CREATE TABLE plan_favorite (
    id UUID PRIMARY KEY NOT NULL,
    model_plan_id UUID NOT NULL, --foreign key to model plan
    user_id EUA_ID NOT NULL,
    --META DATA
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE

);
ALTER TABLE plan_favorite
ADD CONSTRAINT fk_favorite_plan FOREIGN KEY (model_plan_id)
REFERENCES public.model_plan (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;

CREATE UNIQUE INDEX idx_plan_favorite_user
ON plan_favorite(model_plan_id, user_id);
