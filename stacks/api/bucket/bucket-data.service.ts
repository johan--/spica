import {Injectable} from "@nestjs/common";
import {
  DatabaseService,
  InsertOneWriteOpResult,
  ReplaceWriteOpResult,
  InsertWriteOpResult,
  DeleteWriteOpResultObject,
  FilterQuery,
  ObjectId
} from "@spica-server/database";
import {BucketEntry} from "./bucket";

@Injectable()
export class BucketDataService {
  constructor(private db: DatabaseService) {}

  find<T = BucketEntry>(bucketId: string | ObjectId, aggregate?: any): Promise<Array<T>> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    return collection.aggregate(aggregate).toArray();
  }

  findOne<T = BucketEntry, F = any>(
    bucketId: string | ObjectId,
    filter?: FilterQuery<F>
  ): Promise<T | undefined> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    return collection.findOne(filter);
  }

  insertMany(bucketId: string | ObjectId, data: any[]): Promise<InsertWriteOpResult> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    return collection.insertMany(data);
  }

  insertOne(bucketId: string | ObjectId, data: any): Promise<InsertOneWriteOpResult> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    return collection.insertOne(data);
  }

  replaceOne<D extends BucketEntry>(
    bucketId: string | ObjectId,
    data: D
  ): Promise<ReplaceWriteOpResult>;
  replaceOne<D extends BucketEntry>(
    bucketId: string | ObjectId,
    data: D,
    filter: FilterQuery<D>
  ): Promise<ReplaceWriteOpResult>;
  replaceOne(
    bucketId: string,
    data: BucketEntry,
    filter?: FilterQuery<BucketEntry>
  ): Promise<ReplaceWriteOpResult> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    if (!filter && data._id) {
      filter = {_id: data._id};
    } else if (!filter && !data._id) {
      filter = {_id: new ObjectId()};
    }
    return collection.replaceOne(filter, data, {
      upsert: true
    });
  }

  deleteOne(bucketId: string | ObjectId, filter: any): Promise<DeleteWriteOpResultObject> {
    const collection = this.db.collection(getBucketDataCollection(bucketId));
    return collection.deleteOne(filter);
  }

  deleteAll(bucketId: string | ObjectId): Promise<boolean> {
    return this.db.collection(getBucketDataCollection(bucketId)).drop();
  }
}

export function getBucketDataCollection(bucketId: string | ObjectId): string {
  return `bucket_${bucketId}`;
}
