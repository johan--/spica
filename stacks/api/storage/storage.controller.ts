import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards
} from "@nestjs/common";
import {BOOLEAN, NUMBER} from "@spica-server/core";
import {OBJECT_ID} from "@spica-server/database";
import {ActionGuard, AuthGuard} from "@spica-server/passport";
import {Binary, ObjectId} from "bson";

import {Storage, StorageObject} from "./storage.service";

@Controller("storage")
export class StorageController {
  constructor(public storage: Storage) {}

  @Get()
  @UseGuards(AuthGuard(), ActionGuard("storage:index"))
  async findAll(
    @Query("limit", NUMBER) limit: number,
    @Query("skip", NUMBER) skip: number,
    @Query("sort") sort: string
  ) {
    const object = await this.storage.getAll(limit || 10, skip, sort);
    object.data = object.data.map(m => {
      m.url = `${process.env.PUBLIC_HOST}/storage/${m._id}`;
      return m;
    });

    return object;
  }

  @Get(":id")
  async showOne(
    @Param("id", OBJECT_ID) id: ObjectId,
    @Query("withMeta", BOOLEAN) withMeta: boolean,
    @Res() res
  ) {
    const object = await this.storage.get(id);
    if (withMeta) {
      object.url = `${process.env.PUBLIC_HOST}/storage/${object._id}`;
      res.json(object);
    } else {
      res.header("Content-type", object.content.type);
      res.end(object.content.data);
    }
  }

  @Post()
  @UseGuards(AuthGuard(), ActionGuard("storage:update"))
  async addOne(@Body() object: StorageObject) {
    if (!object.content.data) {
      throw new BadRequestException("No content specified.");
    }

    object.content.data = ((object.content.data as any) as Binary).buffer;
    object.content.size = object.content.data.byteLength;

    return await this.storage.upsertOne(object);
  }

  @Delete(":id")
  @UseGuards(AuthGuard(), ActionGuard("storage:delete"))
  async deleteOne(@Param("id", OBJECT_ID) id: ObjectId) {
    return this.storage.deleteOne(id);
  }
}
