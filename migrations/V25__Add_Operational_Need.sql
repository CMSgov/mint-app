CREATE TABLE operational_need (
    id UUID PRIMARY KEY NOT NULL,
    model_plan_id UUID NOT NULL, --foreign key to model plan
    need_type INT,
    need_other ZERO_STRING,

    needed BOOLEAN DEFAULT TRUE,


    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE

);
ALTER TABLE operational_need
ADD CONSTRAINT fk_operational_need_plan FOREIGN KEY (model_plan_id)
REFERENCES public.model_plan (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;


ALTER TABLE operational_need
ADD CONSTRAINT fk_need_possible_need FOREIGN KEY (need_type)
REFERENCES public.possible_operational_need (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;

ALTER TABLE operational_need
ADD CONSTRAINT unique_need_per_plan UNIQUE (model_plan_id, need_type); --TODO update this, this will only allow one other type... Maybe leave other out?

ALTER TABLE operational_need
ADD CONSTRAINT unique_need_other_per_plan UNIQUE (model_plan_id, need_other); --TODO add constraint for either need type or Other filled out

ALTER TABLE operational_need
ADD CONSTRAINT need_type_null_if_other CHECK ((need_type IS NULL OR need_other IS NULL) AND NOT (need_type IS NULL AND need_other IS NULL) );
