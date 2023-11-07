import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'pkg/graph/schema.graphql',
  documents: ['src/gql/apolloGQL/**/*.ts'],
  overwrite: true,
  generates: {
    './src/gql/gen/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false
      }
    },
    './src/gql/gen/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        nonOptionalTypename: true,
        namingConvention: {
          enumValues: 'change-case-all#upperCase#snakeCase'
        },
        scalars: {
          // old codegen mappings from global.d.ts
          // maintain until we add better scalar mapping with graphql-codegen
          //
          // These currently just need to map to aliased types there
          // Hopefully in the future we can use custom/useful types!
          Time: 'Time',
          UUID: 'UUID',
          Upload: 'Upload'
        }
      }
    }
  }
};
export default config;
