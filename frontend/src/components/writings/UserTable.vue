<template>
  <div class="data-table">
    <!-- 顶部工具（可插槽扩展） -->
    <div class="dt-top">
      <slot name="top">
        <div class="dt-default-top">
          <div>共 {{ total }} 条</div>
          <div class="dt-page-size">
            每页
            <select v-model.number="localPerPage" @change="onPerPageChange">
              <option v-for="n in perPageOptions" :key="n" :value="n">{{ n }}</option>
            </select>
            条
          </div>
        </div>
      </slot>
    </div>

    <!-- 表格 -->
    <table>
      <thead>
        <tr>
          <th v-if="selectable">
            <input type="checkbox" :checked="allSelected" @change="toggleSelectAll($event.target.checked)" />
          </th>
          <th v-for="col in columns" :key="col.key" :style="{ width: col.width || 'auto' }" @click="col.sortable ? sortBy(col.key) : null" class="col-head">
            <span>{{ col.label }}</span>
            <span v-if="col.sortable" class="sort-ind">
              <span v-if="sortKey === col.key">
                <span v-if="sortDir === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
              <span v-else class="muted">⇵</span>
            </span>
          </th>
          <th v-if="hasActions">操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="pagedRows.length === 0">
          <td :colspan="colspan" class="empty">暂无数据</td>
        </tr>

        <tr v-for="(row, idx) in pagedRows" :key="rowKey(row, idx)">
          <td v-if="selectable">
            <input type="checkbox" :checked="selectedIdsSet.has(getRowId(row, idx))" @change="toggleSelectRow($event.target.checked, row, idx)" />
          </td>

          <td v-for="col in columns" :key="col.key">
            <template v-if="col.formatter">
              <span v-html="col.formatter(row[col.key], row)"></span>
            </template>
            <template v-else>
              <span>{{ formatCell(row[col.key]) }}</span>
            </template>
          </td>
          <td v-if="hasActions">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 底部分页 -->
    <div class="dt-footer">
      <div class="dt-pagination">
        <button @click="goPage(1)" :disabled="page === 1">首页</button>
        <button @click="goPage(page - 1)" :disabled="page === 1">上一页</button>
        <span>第 {{ page }} / {{ totalPages }} 页</span>
        <button @click="goPage(page + 1)" :disabled="page === totalPages">下一页</button>
        <button @click="goPage(totalPages)" :disabled="page === totalPages">尾页</button>
      </div>

      <div class="dt-info">
        <span>显示 {{ startIndex }} - {{ endIndex }} / {{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs, useSlots} from 'vue'

/** types */
interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  formatter?: (value: any, row?: any) => string
}

/** props */
const props = defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
  rowId?: string | ((row: any, idx: number) => string | number)
  perPage?: number
  perPageOptions?: number[]
  selectable?: boolean
  initialPage?: number
  initialSort?: { key?: string; dir?: 'asc' | 'desc' }
}>()

const emit = defineEmits<{
  (e: 'page-change', page:number): void
  (e: 'sort-change', payload: { key?: string; dir?: 'asc' | 'desc' }): void
  (e: 'selection-change', selectedRows: any[]): void
}>()

/** reactive state */
const { columns, rows } = toRefs(props)
const page = ref(props.initialPage ?? 1)
const localPerPage = ref(props.perPage ?? 10)
const perPageOptions = props.perPageOptions ?? [5,10,20,50]
const sortKey = ref<string | undefined>(props.initialSort?.key)
const sortDir = ref<'asc'|'desc' | undefined>(props.initialSort?.dir ?? undefined)
const selectedIdsSet = ref(new Set<string|number>())

const slots = useSlots()
const hasActions = computed(() => !!slots.actions)

/** computed helpers */
const total = computed(() => rows.value?.length ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / localPerPage.value)))
const startIndex = computed(() => (page.value - 1) * localPerPage.value + 1)
const endIndex = computed(() => Math.min(total.value, page.value * localPerPage.value))

function sortBy(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  emit('sort-change', { key: sortKey.value, dir: sortDir.value })
}

const sortedRows = computed(() => {
  if (!sortKey.value) return rows.value || []
  const key = sortKey.value
  const dirMul = sortDir.value === 'desc' ? -1 : 1
  return [...(rows.value || [])].sort((a,b) => {
    const va = a?.[key]; const vb = b?.[key]
    if (va == null && vb == null) return 0
    if (va == null) return -1 * dirMul
    if (vb == null) return 1 * dirMul
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dirMul
    if (va instanceof Date && vb instanceof Date) return (va.getTime() - vb.getTime()) * dirMul
    return String(va).localeCompare(String(vb)) * dirMul
  })
})

const pagedRows = computed(() => {
  const from = (page.value - 1) * localPerPage.value
  return sortedRows.value.slice(from, from + localPerPage.value)
})

/** methods */
function goPage(n: number) {
  const p = Math.min(Math.max(1, n), totalPages.value)
  page.value = p
  emit('page-change', p)
}

function onPerPageChange() {
  page.value = 1
  emit('page-change', page.value)
}

function formatCell(v: any) {
  if (v == null) return '-'
  if (typeof v === 'boolean') return v ? '是' : '否'
  return String(v)
}

function getRowId(row: any, idx:number) {
  if (typeof props.rowId === 'function') return props.rowId(row, idx)
  if (typeof props.rowId === 'string') return row[props.rowId]
  return (row.id ?? idx)
}

function rowKey(row:any, idx:number) {
  return getRowId(row, idx)
}

/** selection */
const selectable = props.selectable ?? false
const allSelected = computed(() => {
  if (!selectable) return false
  // check current page rows
  return pagedRows.value.length > 0 && pagedRows.value.every((r, i) => selectedIdsSet.value.has(getRowId(r, i)))
})

function toggleSelectAll(checked:boolean) {
  if (!selectable) return
  if (checked) {
    pagedRows.value.forEach((r, i) => selectedIdsSet.value.add(getRowId(r, i)))
  } else {
    pagedRows.value.forEach((r, i) => selectedIdsSet.value.delete(getRowId(r, i)))
  }
  emitSelection()
}

function toggleSelectRow(checked:boolean, row:any, idx:number) {
  const id = getRowId(row, idx)
  if (checked) selectedIdsSet.value.add(id)
  else selectedIdsSet.value.delete(id)
  emitSelection()
}

function emitSelection() {
  const selectedRows = rows.value.filter((r, i) => selectedIdsSet.value.has(getRowId(r, i)))
  emit('selection-change', selectedRows)
}

/** watch props reset */
watch(() => props.rows, () => {
  // reset page to 1 when source changes
  page.value = 1
  selectedIdsSet.value.clear()
})

watch([sortKey, sortDir], () => {
  // keep page at 1 when sorting changes
  page.value = 1
})

</script>

<style scoped>
.data-table { border:1px solid #eee; border-radius:6px; padding:8px; background:#fff; }
.dt-top { display:flex; justify-content:space-between; margin-bottom:8px; }
.dt-default-top { display:flex; gap:12px; align-items:center; color:#444; font-size:13px }
table { width:100%; border-collapse:collapse; }
th, td { padding:8px 10px; border-bottom:1px solid #f0f0f0; text-align:left; vertical-align:middle; }
th.col-head { cursor: pointer; user-select:none; }
.sort-ind { margin-left:8px; font-size:12px; color:#777 }
.muted { color:#c0c0c0 }
.empty { text-align:center; padding:20px; color:#888 }
.avatar { width:36px; height:36px; object-fit:cover; border-radius:4px }
.dt-footer { display:flex; justify-content:space-between; align-items:center; margin-top:8px; gap:12px }
.dt-pagination button { margin-right:6px; padding:6px 8px }
.dt-info { color:#666; font-size:13px }
</style>
