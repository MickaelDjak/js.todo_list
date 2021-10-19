import { Module } from '@nestjs/common';
import {IdGenerator} from "./types/id.generator";
import {UUIDGenerator} from "./impl/uuid.generator";

@Module({
  imports: [],
  controllers: [],
  providers: [
    UUIDGenerator,
    { provide: IdGenerator, useClass: UUIDGenerator },

  ],
  exports: [
    IdGenerator,
    UUIDGenerator
  ]
})
export class SharedModule {}
