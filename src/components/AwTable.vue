  <template>
  <el-row class="el-table-wrapper">
    <el-table
      ref="table"
      :data="tableData"
      v-bind="curTableProps"
      style="width: 100%"
      v-loading="isLoading"
    >
      <template v-for="(column,index) in columns">
        <el-table-column v-if="column.type && column.type==='expand'" v-bind="column" :key="index">
          <template slot-scope="scope">
            <slot name="expand" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else-if="column.type" v-bind="column" :key="index"></el-table-column>
        <el-table-column v-else v-bind="column" :key="index">
          <template slot-scope="scope">
            <slot :name="column.prop" v-bind="scope">
              <template
                v-if="column.formatter"
              >{{ column.formatter(scope.row[column.prop], scope.row) }}</template>
              <template v-else>{{ getCellContent(scope.row[column.prop]) }}</template>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      ref="pagination"
      v-bind="curPageProps"
      @current-change="handlePageChange"
    ></el-pagination>
    <el-row class="el-pagination" v-else-if="showCount">
      <div class="el-pagination__total">共{{ dataCount }}条记录</div>
    </el-row>
  </el-row>
</template>
  
  <script>
export default {
  name: "NewtonTable",

  props: {
    tableProps: Object,
    pageProps: Object,
    pagination: {
      type: Boolean,
      default: false
    },
    // 只有在pagination为false的情况下才生效，展示当前总共多少条数据
    showCount: {
      type: Boolean,
      default: false
    },
    columns: Array,
    data: Array,
    api: [Object, Function],
    params: Object,
    requestConfig: Object,
    autoRequest: {
      type: Boolean,
      default: true
    },
    cellEmptyText: {
      type: String,
      default: "--"
    },
    showCellEmptyText: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      curTableProps: {},
      curPageProps: {
        background: true,
        pagerCount: 5,
        pageSize: 10,
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        total: 0
      },
      tableData: [],
      queryParams: undefined,
      currentResult: undefined,
      isLoading: false
    };
  },

  computed: {
    dataCount() {
      if (this.data) {
        return this.data.length;
      } else {
        return this.curPageProps.total;
      }
    }
  },

  watch: {
    tableProps: {
      deep: true,
      handler: "initTableProps"
    },
    pageProps: {
      deep: true,
      handler: "initPageProps"
    },

    data(val) {
      this.tableData = val;
    },

    "curPageProps.currentPage": "resetParams",

    params: {
      deep: true,
      handler() {
        this.curPageProps.currentPage = 1;
        this.resetParams();
      }
    },

    queryParams: {
      deep: true,
      handler: "fetch"
    },

    api: "fetch"
  },

  created() {
    this.initTableProps();
    this.initPageProps();
  },

  mounted() {
    const tableEvents = [
      "select",
      "select-all",
      "selection-change",
      "cell-mouse-enter",
      "cell-mouse-leave",
      "cell-click",
      "cell-dblclick",
      "row-click",
      "row-contextmenu",
      "row-dblclick",
      "header-click",
      "header-contextmenu",
      "sort-change",
      "filter-change",
      "current-change",
      "header-dragend",
      "expand-change"
    ];

    this.eventBubble("table", tableEvents);

    if (this.data) {
      this.tableData = this.data;
    } else if (this.autoRequest && this.api) {
      this.resetParams();
    }
  },

  methods: {
    initTableProps() {
      Object.assign(this.curTableProps, this.tableProps);
    },

    initPageProps() {
      Object.assign(this.curPageProps, this.pageProps);
    },

    eventBubble(refName, events) {
      const target = this.$refs[refName];

      if (!target) return;

      // 由于gulp打包三点运算符会报错，因此使用ES5的方式
      events.forEach(event => {
        target.$on(
          event,
          function() {
            const args = Array.from(arguments);
            args.unshift(event);
            this.$emit.apply(this, args);
          }.bind(this)
        );
      });
    },

    getCellContent(cellContent) {
      if (
        this.showCellEmptyText &&
        (cellContent === null || cellContent === undefined)
      ) {
        return this.cellEmptyText;
      } else {
        return cellContent;
      }
    },

    handlePageChange(page) {
      this.curPageProps.currentPage = page;
    },

    resetParams() {
      const { curPageProps, pagination } = this;
      this.queryParams = Object.assign(
        pagination
          ? {
              page: curPageProps.currentPage,
              size: curPageProps.pageSize
            }
          : {},
        this.params
      );
    },

    async fetch() {
      const { api, requestConfig } = this;
      if (this.data || !api) return;

      let params = this.queryParams;

      if (requestConfig && requestConfig.contentType === "application/json") {
        params = JSON.stringify(params);
      }

      this.isLoading = true;

      try {
        const res = await api(params);

        this.currentResult = res;
        this.tableData = res.data.rows || [];
        this.curPageProps.total = res.data.total || this.tableData.length;
        this.$emit("load-success", res);

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    refresh(resetPage = true) {
      if (this.pagination && resetPage) {
        this.curPageProps.currentPage = 1;
      }
      this.resetParams();
    },

    clear() {
      if (this.api) {
        this.currentResult = undefined;
        this.tableData = [];
        this.curPageProps.total = 0;
        this.curPageProps.currentPage = 1;
      }
    },

    getCurrentResult() {
      return this.currentResult;
    },

    getCurrentData() {
      return this.tableData;
    },

    getTable() {
      return this.$refs.table;
    }
  }
};
</script>
  
  <style>
</style>
  
  
  
