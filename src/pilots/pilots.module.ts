import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';

@Module({
  controllers: [PilotsController],
  providers: [PilotsService],
})
export class PilotsModule {}
