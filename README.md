![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

<div>
    <img src="./.badges/badge-statements.svg" />
    <img src="./.badges/badge-branches.svg" />
    <img src="./.badges/badge-functions.svg" />
    <img src="./.badges/badge-lines.svg" />
</div>

[![Chromatic Real Deployment](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-real.yaml/badge.svg)](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-real.yaml)
[![Chromatic Stage Deployment](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-stage.yaml/badge.svg)](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-stage.yaml)
[![Chromatic Dev Deployment](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-dev.yaml/badge.svg)](https://github.com/99mini/frontend-libraries/actions/workflows/deploy-dev.yaml)

# 프로젝트 소개

`React`, `Typescript`, `Jest`, `Storybook`을 이용한 프론트엔드 UI 라이브러리 + 유틸 라이브러리입니다.

## 설치 및 사용

1. [@99mini/utils](https://github.com/99mini/frontend-libraries/blob/main/packages/utils/README.md)
2. [@99mini/core](https://github.com/99mini/frontend-libraries/blob/main/packages/core/README.md)
3. [@99mini/atom](https://github.com/99mini/frontend-libraries/blob/main/packages/atom/README.md)
4. [@99mini/molecular](https://github.com/99mini/frontend-libraries/blob/main/packages/molecular/README.md)
5. [@99mini/yni-ui](https://github.com/99mini/frontend-libraries/blob/main/packages/yni-ui/README.md)
6. [@99mini/calendar](https://github.com/99mini/frontend-libraries/blob/main/packages/calendar/README.md)

## 개발

### 개발 환경

- node v18
- ubuntu v20
- yarn

### install dependency

```bash
$ yarn
```

### 스토리북

```bash
$ yarn storybook
```

### 테스트

1. jest

```bash
$ yarn test
$ yarn test --ci --watch
$ yarn test --ci --coverage
```

2. storybook

```bash
$ yarn storybook
$ yarn test-storybook --watch
$ yarn test-storybook --coverage
```

### directory dependency

```mermaid
graph LR
    classDef toBeUpdated fill:#EBEBE445, color: #C6C6C6

    atom[📁atom] ----> molecular[📁molecular]

    core[📁core] ----> atom & molecular & organism

    utils[📁utils] ----> atom & core

    atom & molecular & core ----> yni-ui[📁yni-ui]

    atom & molecular ----> organism[📁organism - to be update]:::toBeUpdated

    utils & atom & molecular & core ----> calendar[📁calendar]
```

### generate component boilerplate

`gcb` is an abbreviation for generate component boilerplate

- first arg: package-name (ex. `core`). Use lowercase
- second arg: FileName (ex. `ClickOutsideLinstener`). Use PascalCase

```bash
$ scripts/gcb.sh <package-name> <FileName>
```

#### Example

```bash
$ scripts/gcb.sh core ClickOutsideLinstener
```

### 배포

```bash
packages/<package-name>$ yarn ci
packages/<package-name>$ yarn deploy:only
```

or

```bash
packages/<package-name>$ yarn deploy
```
