<template>
  <div>
    <el-tree
      ref="tree"
      :data="groupData"
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      :default-expanded-keys="currentExpands"
      @node-click="handleNodeClick"
      @current-change="handleCurrentChange"
      @node-contextmenu="handleContextMenu"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
    >
      <div class="custom-tree-node" slot-scope="{ data }">
        <i class="iconfont icon-group"></i>
        <span>{{ data.label }}</span>
        <tree-context-menu
          v-if="contextMenuKey === data.id"
          :position="contextMenuPosition"
          @clickoutside="hideContextMenu"
          @click.native="hideContextMenu"
        >
          <a @click="handleAdd(data)">
            <i class="iconfont icon-groupadd"></i>添加子群组
          </a>
          <!-- 根节点的右键菜单不展示编辑和删除 -->
          <template v-if="!isRootNode(data)">
            <a @click="handleModify(data)">
              <i class="iconfont icon-bxs-edit"></i>修改群组名称
            </a>
            <a @click="handleRemove(data)">
              <i class="iconfont icon-close"></i>删除群组
            </a>
          </template>
        </tree-context-menu>
      </div>
    </el-tree>
    <contact-group-modal :visible.sync="modal.visible" v-bind="modal" @submitted="refresh"></contact-group-modal>
  </div>
</template>

<script>
import { removeContactGroup } from "@/api/api";
import TreeContextMenu from "./TreeContextMenu";
import ContactGroupModal from "./ContactGroupModal";
import { arrayToTree } from "@/utils/util";

export default {
  components: {
    TreeContextMenu,
    ContactGroupModal
  },

  data() {
    return {
      // 当前选中节点id
      currentKey: null,
      // 当前展开节点
      currentExpands: null,
      contextMenuKey: null,
      contextMenuPosition: null,
      modal: {
        visible: false,
        action: "add",
        props: null
      }
    };
  },

  computed: {
    contactGroups() {
      return this.$store.state.contactGroups || [];
    },

    groupData() {
      return arrayToTree(this.contactGroups);
    }
  },

  watch: {
    groupData(val) {
      this.currentExpands = this.currentExpands || (val[0] && [val[0].id]);
      this.initActiveNode();
    },

    currentKey(val) {
      this.$emit("change", val);
    }
  },

  created() {
    this.$store.dispatch("fetchContactGroups");
  },

  mounted() {
    this.initActiveNode();
  },

  methods: {
    /**
     * 初始化选中节点
     */
    initActiveNode() {
      const { tree } = this.$refs;
      const rootNode = this.groupData[0];
      if (!rootNode || !tree) return;

      this.$nextTick(() => {
        this.currentKey = this.currentKey || rootNode.id;
        tree.setCurrentKey(this.currentKey);
      });
    },

    /**
     * 选中节点改变
     * @param {Object} 节点数据
     */
    handleCurrentChange(data) {
      this.currentKey = data.id;
    },

    /**
     * 打开新增群组弹框
     * @param {Object} 节点数据
     */
    handleAdd(data) {
      this.modal.visible = true;
      this.modal.action = "add";
      this.modal.props = {
        pid: data.id
      };
    },

    /**
     * 打开编辑群组名称弹框
     * @param {Object} 节点数据
     */
    handleModify(data) {
      this.modal.visible = true;
      this.modal.action = "modify";
      this.modal.props = {
        id: data.id,
        name: data.label
      };
    },

    /**
     * 删除群组
     * @param {Object} 节点数据
     */
    handleRemove({ id }) {
      this.$confirm(
        "删除群组将同时删除该群组下的子群组和联系人，确认删除？",
        "提示",
        {
          type: "warning"
        }
      )
        .then(async () => {
          const { message } = await removeContactGroup({ id });
          this.$message.success(message);

          // 若删除了当前选中的节点，则将当前选中置为空
          if (id === this.currentKey) {
            this.currentKey = null;
          }
          this.refresh();
        })
        .catch(() => {});
    },

    handleNodeClick() {},

    /**
     * 节点展开，更新展开集合
     * @param {Object} 节点数据
     */
    handleNodeExpand({ id }) {
      if (!this.currentExpands) {
        this.currentExpands = [id];
      } else if (!this.currentExpands.includes(id)) {
        this.currentExpands.push(id);
      }
    },

    /**
     * 节点关闭，从展开集合里移除该节点的key
     * @param {Object} 节点数据
     */
    handleNodeCollapse({ id }) {
      this.currentExpands = this.currentExpands.filter(item => item !== id);
    },

    /**
     * 显示右键菜单
     * @param {Event} 事件对象
     * @param {Object} 节点数据
     */
    handleContextMenu(event, data) {
      this.contextMenuKey = data.id;
      this.contextMenuPosition = {
        left: event.pageX + 10,
        top: event.pageY
      };
    },

    /**
     * 关闭右键菜单
     */
    hideContextMenu() {
      this.contextMenuKey = null;
    },

    /**
     * 判断是否为根节点
     * @param {Object} 节点数据
     */
    isRootNode(data) {
      return this.groupData.some(item => item.id === data.id);
    },

    /**
     * 刷新数据
     */
    refresh() {
      this.$store.dispatch("fetchContactGroups", true);
    }
  }
};
</script>

<style>
</style>
