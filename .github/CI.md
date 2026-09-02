# CI/CD y auto-merge

## Reparto

| Parte | Donde corre | Fichero |
|-------|-------------|---------|
| Web (`apps/web`) | GitHub Actions | `.github/workflows/web-ci.yml` (PR) · `web-cd.yml` (main) |
| API (`apps/api`) | Azure DevOps | `azure-pipelines.yml` (CI en PR · Docker + Deploy en main) |

Los PR viven **siempre en GitHub**. Azure DevOps esta conectado a este mismo
repositorio y publica su resultado como check en el PR.

## Flujo con auto-merge

1. Abres un PR contra `main`.
2. Corren los checks: `Lint & Build` (GitHub) y el del pipeline de Azure.
3. Le pones la etiqueta **`automerge`** al PR.
4. Cuando todos los checks obligatorios pasan y no hay conflictos, GitHub hace
   squash-merge solo. Si algo falla, el PR se queda abierto.
5. El push a `main` dispara el CD que corresponda segun las rutas tocadas:
   `apps/web/**` despliega la web, `apps/api/**` despliega la API.

Quitar la etiqueta `automerge` cancela el merge automatico.

## Por que los triggers de PR no llevan filtro de rutas

Un check obligatorio que no se ejecuta **bloquea el PR para siempre**: GitHub lo
espera y nunca llega. Como `web-ci.yml` y `azure-pipelines.yml` publican checks
obligatorios, sus triggers de PR corren en todos los PR a `main`.

Los triggers de despliegue (push a `main`) **si** llevan filtro de rutas: un
merge de solo documentacion no debe redesplegar produccion.

## Puesta en marcha (una sola vez)

1. **Settings > General > Pull Requests**: activar *Allow auto-merge*.
2. **Settings > Rules > Rulesets**: la ruleset `main` debe estar en *Active*, con
   los nombres de check exactos tal y como aparecen en un PR real.
3. **Secret `AUTOMERGE_TOKEN`** (Settings > Secrets and variables > Actions):
   un PAT fine-grained sobre este repositorio con permisos
   *Contents: Read and write* y *Pull requests: Read and write*.

El paso 3 no es opcional. Si el workflow usa el `GITHUB_TOKEN` por defecto,
GitHub no encadena workflows disparados por el: el merge se haria, pero el push
a `main` **no** lanzaria el CD y no habria despliegue.
