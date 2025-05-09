import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LinksModule } from 'src/http/link/links.module';
import { Env } from 'src/infra/env/env.dto';
import { EnvService } from 'src/infra/env/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const validateConfig = plainToClass(Env, env);

        const errors = validateSync(validateConfig);

        if (errors.length > 0) {
          throw new Error(
            `Env validation failed: ${errors.map((err) => Object.values(err.constraints || {}).join(', ')).join('; ')}`,
          );
        }

        return validateConfig;
      },
    }),
    LinksModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
