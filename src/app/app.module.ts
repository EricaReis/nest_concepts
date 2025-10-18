import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { ConceptsAutomaticModule } from 'src/concepts-automatic/concepts-automatic.module';

@Module({
  imports: [ConceptsModule, ConceptsAutomaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
