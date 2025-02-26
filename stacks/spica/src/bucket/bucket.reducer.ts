import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Action, createFeatureSelector} from "@ngrx/store";
import {Bucket} from "./interfaces/bucket";

export enum BucketActionTypes {
  RETRIEVE = "BUCKET_RETRIEVE",
  ADD = "BUCKET_ADD",
  REMOVE = "BUCKET_REMOVE",
  UPDATE = "BUCKET_UPDATE",
  UPSERT = "BUCKET_UPSERT"
}

export class Add implements Action {
  public readonly type = BucketActionTypes.ADD;
  constructor(public bucket: Bucket) {}
}

export class Update implements Action {
  public readonly type = BucketActionTypes.UPDATE;
  constructor(public id: string, public changes: Partial<Bucket>) {}
}

export class Upsert implements Action {
  public readonly type = BucketActionTypes.UPSERT;
  constructor(public bucket: Bucket) {}
}

export class Remove implements Action {
  public readonly type = BucketActionTypes.REMOVE;
  constructor(public id: string) {}
}

export class Retrieve implements Action {
  public readonly type = BucketActionTypes.RETRIEVE;
  constructor(public buckets: Bucket[]) {}
}

export type BucketAction = Retrieve | Add | Update | Remove | Upsert;

export interface State extends EntityState<Bucket> {}

export const adapter = createEntityAdapter<Bucket>({selectId: bucket => bucket._id});

export const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState, action: BucketAction): State {
  switch (action.type) {
    case BucketActionTypes.RETRIEVE:
      return adapter.addAll(action.buckets, state);
    case BucketActionTypes.ADD:
      return adapter.addOne(action.bucket, state);
    case BucketActionTypes.REMOVE:
      return adapter.removeOne(action.id, state);
    case BucketActionTypes.UPDATE:
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    case BucketActionTypes.UPSERT:
      return adapter.upsertOne(action.bucket, state);
    default:
      return state;
  }
}

export const {selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors(
  createFeatureSelector<State>("bucket")
);
