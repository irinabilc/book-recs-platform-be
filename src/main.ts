import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

if (process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
    require('module-alias/register')
}

async function bootstrap() {
    const APP_PORT = process.env.APP_PORT || 3000

    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('NestJS Book Recommendations API')
        .setDescription(
            'NestJS Book Recommendations API done as a project to learn NestJS and Prisma'
        )
        .setVersion('0.1')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document)

    await app.listen(APP_PORT, () => {
        console.log(`Application is running on: http://localhost:${APP_PORT}`)
    })
}
bootstrap()
