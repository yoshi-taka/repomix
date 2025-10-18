# Uso básico

## Inicio rápido

Empaqueta todo tu repositorio:
```bash
repomix
```

## Casos de uso comunes

### Empaquetar directorios específicos
```bash
repomix ruta/al/directorio
```

### Incluir archivos específicos
Usa [patrones glob](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#pattern-syntax):
```bash
repomix --include "src/**/*.ts,**/*.md"
```

### Incluir estructura de directorios completa con archivos específicos

Al usar patrones `--include`, también puedes mostrar la estructura de árbol de directorios completa mientras procesas solo los archivos seleccionados:

```bash
repomix --include "cli/**/*.go" --include-full-directory-structure
```

Esta bandera proporciona el contexto completo del repositorio mostrando todos los directorios y archivos (respetando los patrones de ignorar) en la sección de estructura de directorios, mientras solo procesa los archivos que coinciden con los patrones de inclusión.

**Beneficios:**
- **Contexto completo del proyecto**: Ver la estructura de directorios completa, incluyendo archivos fuera de los patrones de inclusión
- **Procesamiento enfocado**: El contenido de los archivos y las métricas aún reflejan solo los archivos incluidos
- **Mejor comprensión de IA**: Proporciona el diseño completo del repositorio para un mejor contexto

**Ejemplo:**

Sin la bandera:
```
<directory_structure>
cli/
  go.mod
  main.go
  README.md
</directory_structure>
```

Con `--include-full-directory-structure`:
```
<directory_structure>
README.md
LICENSE.md
cli/
  go.mod
  main.go
  README.md
docs/
  guide.md
</directory_structure>
```

**Nota:** Esta bandera solo afecta la visualización de la estructura de directorios. El procesamiento de archivos, el contenido y las métricas permanecen limitados a tus patrones de inclusión.

### Excluir archivos
```bash
repomix --ignore "**/*.log,tmp/"
```

### Repositorios remotos
```bash
# Usando la URL de GitHub
repomix --remote https://github.com/usuario/repositorio

# Usando la abreviatura
repomix --remote usuario/repositorio

# Rama/etiqueta/commit específico
repomix --remote usuario/repositorio --remote-branch main
repomix --remote usuario/repositorio --remote-branch 935b695
```

### Entrada de lista de archivos (stdin)

Pasa rutas de archivos a través de stdin para máxima flexibilidad:

```bash
# Usando el comando find
find src -name "*.ts" -type f | repomix --stdin

# Usando git para obtener archivos rastreados
git ls-files "*.ts" | repomix --stdin

# Usando ripgrep (rg) para encontrar archivos
rg --files --type ts | repomix --stdin

# Usando grep para encontrar archivos que contienen contenido específico
grep -l "TODO" **/*.ts | repomix --stdin

# Usando ripgrep para encontrar archivos con contenido específico
rg -l "TODO|FIXME" --type ts | repomix --stdin

# Usando sharkdp/fd para encontrar archivos
fd -e ts | repomix --stdin

# Usando fzf para seleccionar de todos los archivos
fzf -m | repomix --stdin

# Selección interactiva de archivos con fzf
find . -name "*.ts" -type f | fzf -m | repomix --stdin

# Usando ls con patrones glob
ls src/**/*.ts | repomix --stdin

# Desde un archivo que contiene rutas de archivos
cat file-list.txt | repomix --stdin

# Entrada directa con echo
echo -e "src/index.ts\nsrc/utils.ts" | repomix --stdin
```

La opción `--stdin` te permite canalizar una lista de rutas de archivos a Repomix, brindando máxima flexibilidad en la selección de qué archivos empaquetar.

Cuando se usa `--stdin`, los archivos especificados se agregan efectivamente a los patrones de inclusión. Esto significa que el comportamiento normal de inclusión e ignorar sigue aplicando - los archivos especificados vía stdin aún serán excluidos si coinciden con patrones de ignorar.

> [!NOTE]
> Cuando uses `--stdin`, las rutas de archivos pueden ser relativas o absolutas, y Repomix manejará automáticamente la resolución de rutas y la eliminación de duplicados.

### Compresión de código

```bash
repomix --compress

# También puedes usarlo con repositorios remotos:
repomix --remote yamadashy/repomix --compress
```

### Integración con Git

Incluye información de Git para proporcionar contexto de desarrollo al análisis de IA:

```bash
# Incluir diffs de git (cambios sin commit)
repomix --include-diffs

# Incluir logs de commits de git (últimos 50 commits por defecto)
repomix --include-logs

# Incluir número específico de commits
repomix --include-logs --include-logs-count 10

# Incluir tanto diffs como logs
repomix --include-diffs --include-logs
```

Esto añade contexto valioso sobre:
- **Cambios recientes**: Los diffs de Git muestran modificaciones sin commit
- **Patrones de desarrollo**: Los logs de Git revelan qué archivos típicamente se cambian juntos
- **Historial de commits**: Los mensajes de commit recientes proporcionan información sobre el enfoque de desarrollo
- **Relaciones entre archivos**: Entender qué archivos se modifican en los mismos commits

### Optimización del conteo de tokens

Entender la distribución de tokens de tu base de código es crucial para optimizar las interacciones con IA. Usa la opción `--token-count-tree` para visualizar el uso de tokens en todo tu proyecto:

```bash
repomix --token-count-tree
```

Esto muestra una vista jerárquica de tu base de código con conteos de tokens:

```
🔢 Token Count Tree:
────────────────────
└── src/ (70,925 tokens)
    ├── cli/ (12,714 tokens)
    │   ├── actions/ (7,546 tokens)
    │   └── reporters/ (990 tokens)
    └── core/ (41,600 tokens)
        ├── file/ (10,098 tokens)
        └── output/ (5,808 tokens)
```

También puedes establecer un umbral mínimo de tokens para enfocarte en archivos más grandes:

```bash
repomix --token-count-tree 1000  # Solo mostrar archivos/directorios con 1000+ tokens
```

Esto te ayuda a:
- **Identificar archivos pesados en tokens** - que podrían exceder los límites de contexto de IA
- **Optimizar la selección de archivos** - usando patrones `--include` e `--ignore`
- **Planificar estrategias de compresión** - dirigiéndose a los mayores contribuyentes
- **Equilibrar contenido vs contexto** - al preparar código para análisis de IA

## Formatos de salida

### XML (predeterminado)
```bash
repomix --style xml
```

### Markdown
```bash
repomix --style markdown
```

### JSON
```bash
repomix --style json
```

### Texto sin formato
```bash
repomix --style plain
```

## Opciones adicionales

### Eliminar comentarios
```bash
repomix --remove-comments
```

### Mostrar números de línea
```bash
repomix --output-show-line-numbers
```

### Copiar al portapapeles
```bash
repomix --copy
```

### Deshabilitar la verificación de seguridad
```bash
repomix --no-security-check
```

## Configuración

Inicializar el archivo de configuración:
```bash
repomix --init
```

Consulta la [Guía de configuración](/guide/configuration) para obtener opciones detalladas.
