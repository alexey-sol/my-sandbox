## Geek Regime - коллективный блог
Код: https://github.com/alexey-sol/geek-regime

Незаконченный долгострой, где отрабатываю все интересные штуки, почерпнутые на работе, из курсов и статей. По функционалу ориентируюсь на Habr.

UI реализую на TypeScript, React, Styled Components, Redux Toolkit и RTK Query с кэшированием и оптимистичными апдейтами (например, [вот так](https://github.com/alexey-sol/geek-regime/blob/main/client-web/src/features/posts/services/api/api.ts) выглядят запросы на работу с постами). Часть кода, который теоретически может переиспользоваться, вынесен в NPM пакеты (к примеру, компоненты и UI'ные конфиги сидят в [UI kit пакете](https://github.com/alexey-sol/geek-regime/blob/main/js-ui-kit/package.json) со Storybook).

Бэкенд состоит из ряда микросервисов, которые написаны в основном на Java и один на Kotlin - все со Spring Boot. Есть API Gateway сервис - он реализуется на Node.js с NestJS (перенаправляет запросы на "внутренние" сервисы плюс [заправляет безопасностью](https://github.com/alexey-sol/geek-regime/blob/main/api-gateway/src/auth/controllers/v1.ts)). Есть также один сервис агрегации, который борется с проблемой бесконтрольных взаимодействий между сервисами; в данном случае он ходит в сервисы постов и пользователей и [отдает наружу посты с их авторами](https://github.com/alexey-sol/geek-regime/blob/main/api-aggregator/src/main/java/com/github/alexeysol/geekregime/apiaggregator/features/posts/controllers/v1/PostController.java). Переиспользуемый функционал вынесен в отдельную зависимость - api-commons, которая пушится в реестр Docker Hub и [вытягивается оттуда](https://github.com/alexey-sol/geek-regime/blob/main/launcher/builder/jvm/Dockerfile) при сборке конкретного приложения.

Управлять всей этой пачкой сервисов [помогает Docker Compose](https://github.com/alexey-sol/geek-regime/tree/main/launcher).

## Nuxt.js Multiroom Chat - текстовый чат с комнатами
Код: https://github.com/alexey-sol/nuxtjs-multiroom-chat

Текстовый чат на Nuxt.js - написал, когда любопытства ради решил изучить Vue.js. Сообщение между клиентом и сервером налажено по вебсокету, через слой Socket IO. Нарисовать UI помогла библиотека Element UI.
Комнаты можно создавать, джойниться в т.ч. по URL. Когда из комнаты выходит последний юзер, она самоуничтожается - так что осторожнее (а кроме этого срок годности у комнат не ограничен; ну, еще постоянного хранилища нет, все сидит в памяти на бэкенде).

## Whatnotarium - (yet another) коллективный блог
Код: https://github.com/alexey-sol/whatnotarium

Здесь отрабатывал навыки пару лет назад. Своего рода клон Habr. Написан на JS стеке. Бэкенд: TypeScript + Node.js + Express.js, в качестве БД выбрал Postgres. Фронтенд: JavaScript + React + Redux с сагами. Все компоненты завернул в докер-контейнеры (управляются они при помощи Docker Compose с разбивкой на среды).

Прим.: изначально проект назывался Geek Regime, позже это название перекочевало в проект-"перезапуск", который идет выше 1-м пунктом.
