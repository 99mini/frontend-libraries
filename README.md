![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

<div>
    <img src="./.badges/badge-statements.svg" />
    <img src="./.badges/badge-branches.svg" />
    <img src="./.badges/badge-functions.svg" />
    <img src="./.badges/badge-lines.svg" />
</div>

# 프로젝트 소개

`React`, `Typescript`, `Scss`, `Jest`, `Storybook`을 이용한 프론트엔드 UI 라이브러리 + 유틸 라이브러리입니다.

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

### install dependency

```bash
$ npm install
```

`or`

```bash
$ yarn
```

### 로컬

```bash
$ npm run storybook
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

```bash
$ scripts/gcb.sh <package-name> <FileName>
```

### 배포

```bash
$ npm login
$ yarn publish --access public
```
