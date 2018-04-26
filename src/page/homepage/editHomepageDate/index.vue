<template>
  <div class="editHomepageDate">
    <tools @save='handleSave' />
    <div class="state">
      <div class="edit-nav">
        <div class="nav-list" :key="nav.to" v-for="nav in editNav" @click="editNavTo(nav.to)">{{nav.text}}</div>
      </div>
      <div class="edit-wrapper" v-if='!isLoading' ref="editWrapper">
        <EditData title='顶部轮播图' class="swiper" id='top-swiper'>
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('swiper')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-swiper edit" :key="index" v-for="(item, index) in getHomepage.swiper.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'swiper')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='引导' class="guide" id="guide">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('guide')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-guide edit" v-for="(item, index) in getHomepage.guide.item" :key="index">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'guide')"></i>
                <div class="subtitle">
                  <el-input v-model="item.title" placeholder="请输入标题"></el-input>
                </div>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='新品' class="newproduce" id="newproduce">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('newproduce')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <combinationInput :data='getHomepage.newproduce.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-newproduce edit" v-for="item in getHomepage.newproduce.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'newproduce')"></i>
                <div class="subtitle">
                  {{item.title}}
                </div>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary" plain>点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='星卡会员特权' class='starPrivilege' id="starPrivilege">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('starPrivilege')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-starPrivilege edit" v-for="(item, index) in getHomepage.starPrivilege.item" :key="index">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'starPrivilege')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData :title='`买手推荐-${buyerrecommend.kind}`' class="buyerrecommend" v-for="(buyerrecommend, index) in getHomepage.buyerrecommend" :id="`BC-${index}`" :key="index">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('buyerrecommend', buyerrecommend)">新增</el-button>
          </div>
          <div class="subtitle">
            <el-input v-model="buyerrecommend.kind" placeholder="请输入推文类别"></el-input>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-buyerrecommend edit" :key="index" v-for="(item, index) in buyerrecommend.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'buyerrecommend', buyerrecommend)"></i>
                <div class="edit-author edit-item">
                  <div class="th3-title">
                    选择作者
                  </div>
                  <el-select value-key="name" v-model="item.author" placeholder="请选择作者">
                    <el-option
                      v-for="item in authorList"
                      :key="item.id"
                      :label="item.name"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="edit-title edit-item">
                  <div class="th3-title">
                    编辑买手推荐标题
                  </div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.title">
                  </el-input>
                </div>
                <div class="edit-desc edit-item">
                  <div class="th3-title">
                    编辑买手推荐描述
                  </div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.desc">
                  </el-input>
                </div>
                <div class="edit-showCommodity edit-item">
                  <div class="th3-title">
                    编辑买手推荐对应商品
                  </div>
                  <el-input v-model="item.commodityId" placeholder="请输入数字" size="mini"></el-input>
                </div>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='买家show' class="show" id="show">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('show')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <combinationInput :data='getHomepage.show.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-show edit" :key="index" v-for="(item, index) in getHomepage.show.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'show')"></i>
                <div class="edit-author edit-item">
                  <div class="th3-title">
                    选择作者
                  </div>
                  <el-select value-key="name" v-model="item.author" placeholder="请选择作者">
                    <el-option
                      v-for="item in authorList"
                      :key="item.id"
                      :label="item.name"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="edit-message edit-item">
                  <div class="th3-title">
                    编辑作者message
                  </div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.message">
                  </el-input>
                </div>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='品牌' class="brand" id="brand">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('brand')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <combinationInput :data='getHomepage.brand.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-show edit" :key="index" v-for="(item, index) in getHomepage.brand.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'brand')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <!-- <EditData title='包袋' class="handbags">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('handbags')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove(getHomepage.handbags.main)"
                :on-success="handleUploadSuccess(getHomepage.handbags.main)"
                :file-list="getHomepage.handbags.main.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <combinationInput :data='getHomepage.handbags.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-handbags edit" v-for="item in getHomepage.handbags.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'handbags')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='礼服' class="fulldress">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('fulldress')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove(getHomepage.fulldress.main)"
                :on-success="handleUploadSuccess(getHomepage.fulldress.main)"
                :file-list="getHomepage.fulldress.main.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <combinationInput :data='getHomepage.fulldress.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-fulldress edit" v-for="item in getHomepage.fulldress.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'fulldress')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='旅行生活' class="travellife">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('travellife')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-main">
              <div class="main-title">
                主图 or 更多
              </div>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove(getHomepage.travellife.main)"
                :on-success="handleUploadSuccess(getHomepage.travellife.main)"
                :file-list="getHomepage.travellife.main.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <combinationInput :data='getHomepage.travellife.main'/>
            </div>
            <div class="edit-content">
              <div class="edit-travellife edit" v-for="item in getHomepage.travellife.item">
                <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'travellife')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData> -->
        <EditData title='猜你喜欢-轮播图' class="guesslike" id="guesslike-swiper">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAddGuesslike('swiper')">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-swiper edit" :key="index" v-for="(item, index) in getHomepage.guesslike.swiper">
                <i class="el-icon-circle-close-outline delete" @click="handleDeleteGuesslike(item, 'swiper')"></i>
                <el-upload
                  class="upload"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove(item)"
                  :on-success="handleUploadSuccess(item)"
                  :file-list="item.img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <combinationInput :data='item'/>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='猜你喜欢-包袋' class="guesslike" id="guesslike-bags">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAddGuesslike('handbags')">新增</el-button>
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="toggleGuesslikeGroupEntry('handbags')">批量录入</el-button>
            <div class="num">
              共 <span :style="{color: 'red'}">{{getHomepage.guesslike.handbags.length}}</span> 个商品
            </div>
            <!-- <div class="showkind">
              <el-radio-group v-model="guesslikeShowKind">
                <el-radio label="card">图片卡片</el-radio>
                <el-radio label="id">id卡片</el-radio>
              </el-radio-group>
            </div> -->
          </div>
          <div class="content">
            <div class="edit-guesslike-group" v-show="isGuesslikeGroupEntry.handbags">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入商品id，以英文','号分割，点击任意空白完成输入。由于本处未添加错误检查，所以，在输入时请注意不要错误，不要有空格"
                @change="handleChangeGuesslike('handbags')"
                v-model="entryGuesslikes">
              </el-input>
            </div>
            <div class="edit-content edit-guesslike-wrapper">
              <div class="edit-guesslike edit" :key="index" v-for="(item, index) in getHomepage.guesslike.handbags">
                <i class="el-icon-circle-close-outline delete" @click="handleDeleteGuesslike(item, 'handbags')"></i>
                <el-input v-model="item.id" placeholder="请输入内容" size="mini"></el-input>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='猜你喜欢-礼服' class="guesslike" id="guesslike-fulldress">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAddGuesslike('fulldress')">新增</el-button>
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="toggleGuesslikeGroupEntry('fulldress')">批量录入</el-button>
            <div class="num">
              共 <span :style="{color: 'red'}">{{getHomepage.guesslike.fulldress.length}}</span> 个商品
            </div>
            <!-- <div class="showkind">
              <el-radio-group v-model="guesslikeShowKind">
                <el-radio label="card">图片卡片</el-radio>
                <el-radio label="id">id卡片</el-radio>
              </el-radio-group>
            </div> -->
          </div>
          <div class="content">
            <div class="edit-guesslike-group" v-show="isGuesslikeGroupEntry.fulldress">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入商品id，以英文','号分割，点击任意空白完成输入。由于本处未添加错误检查，所以，在输入时请注意不要错误，不要有空格"
                @change="handleChangeGuesslike('fulldress')"
                v-model="entryGuesslikes">
              </el-input>
            </div>
            <div class="edit-content edit-guesslike-wrapper">
              <div class="edit-guesslike edit" :key="index" v-for="(item, index) in getHomepage.guesslike.fulldress">
                <i class="el-icon-circle-close-outline delete" @click="handleDeleteGuesslike(item, 'fulldress')"></i>
                <el-input v-model="item.id" placeholder="请输入内容" size="mini"></el-input>
              </div>
            </div>
          </div>
        </EditData>
        <EditData title='猜你喜欢-旅行' class="guesslike" id="guesslike-travel">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAddGuesslike('travellife')">新增</el-button>
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="toggleGuesslikeGroupEntry('travellife')">批量录入</el-button>
            <div class="num">
              共 <span :style="{color: 'red'}">{{getHomepage.guesslike.travellife.length}}</span> 个商品
            </div>
            <!-- <div class="showkind">
              <el-radio-group v-model="guesslikeShowKind">
                <el-radio label="card">图片卡片</el-radio>
                <el-radio label="id">id卡片</el-radio>
              </el-radio-group>
            </div> -->
          </div>
          <div class="content">
            <div class="edit-guesslike-group" v-show="isGuesslikeGroupEntry.travellife">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入商品id，以英文','号分割，点击任意空白完成输入。由于本处未添加错误检查，所以，在输入时请注意不要错误，不要有空格"
                @change="handleChangeGuesslike('travellife')"
                v-model="entryGuesslikes">
              </el-input>
            </div>
            <div class="edit-content edit-guesslike-wrapper">
              <div class="edit-guesslike edit" :key="index" v-for="(item, index) in getHomepage.guesslike.travellife">
                <i class="el-icon-circle-close-outline delete" @click="handleDeleteGuesslike(item, 'travellife')"></i>
                <el-input v-model="item.id" placeholder="请输入内容" size="mini"></el-input>
              </div>
            </div>
          </div>
        </EditData>
      </div>
    </div>
    
  </div>
</template>
<script>
  // TODO: 猜你喜欢 批量录入
  // TODO: 猜你喜欢 按从小到大排序
  // TODO: 猜你喜欢 卡片显示模式：带商品缩略图

  import EditData from '@/components/EditData'
  import combinationInput from '@/components/combinationInput'
  import tools from '@/components/tools'
  import api from '@/api'
  import { mapMutations, mapState } from 'vuex'

  import HOMEPAGE_MUTATION from '../../../gql/setHomepage.gql'

  // 空数据，用于新建
  // 字段名与真实数据保持一致
  const emptyData = {
    swiper: {
      link: '',
      img: [],
      type: '1'
    },
    guide: {
      type: '1',
      title: '新的',
      link: '',
      img: []
    },
    newproduce: {
      type: '1',
      link: '',
      img: []
    },
    starPrivilege: {
      type: '1',
      link: '',
      img: []
    },
    show: {
      author: {
        avator: '',
        desc: '',
        id: '',
        name: '',
        tag: []
      },
      img: [],
      type: '1',
      link: '',
      message: ''
    },
    buyerrecommend: {
      author: {
        avator: '',
        desc: '',
        id: '',
        name: '',
        tag: []
      },
      title: '',
      desc: '',
      commodityId: '',
      type: '1',
      link: '',
      img: []
    },
    brand: {
      type: '1',
      link: '',
      img: []
    },
    handbags: {
      type: '1',
      link: '',
      img: []
    },
    travellife: {
      type: '1',
      link: '',
      img: []
    },
    fulldress: {
      type: '1',
      link: '',
      img: []
    },
    guesslike: {
      id: ''
    }
  }

  export default {
    name: 'editHomepageDate',
    components: {
      EditData,
      combinationInput,
      tools
    },
    data () {
      return {
        guesslikeShowKind: 'card',
        getHomepage: JSON.parse(JSON.stringify(this.$store.state.homepage.data)),
        uploadUrl: this.$store.state.uri + '/api/uploadImg',
        isGuesslikeGroupEntry: {
          handbags: false,
          fulldress: false,
          travellife: false
        }, // 批量录入猜你喜欢开关
        entryGuesslikes: ''
      }
    },
    computed: {
      ...mapState({
        // 因为直接用computed做input的v-model，导致无法实时更新页面，所以，需要用watch监听data变化，并更新到getHomepage
        data: state => state.homepage.data,
        isLoading: state => state.homepage.isLoading,
        authorList: state => state.author.byId
      }),
      editNav () {
        // 买手推荐的nav
        let BC = []
        if (!this.isLoading) {
          BC = this.getHomepage.buyerrecommend.map((item, index) => {
            return {
              text: `买手推荐-${item.kind}`,
              to: `#BC-${index}`
            }
          })
        }
        
        return [
          {
            text: '顶部轮播图',
            to: '#top-swiper'
          },
          {
            text: '引导',
            to: '#guide'
          },
          {
            text: '新品',
            to: '#newproduce'
          },
          {
            text: '星卡会员特权',
            to: '#starPrivilege'
          },
          ...BC,
          {
            text: '买家show',
            to: '#show'
          },
          {
            text: '猜你喜欢-轮播图',
            to: '#guesslike-swiper'
          },
          {
            text: '猜你喜欢-包袋',
            to: '#guesslike-bags'
          },
          {
            text: '猜你喜欢-包袋',
            to: '#guesslike-fulldress'
          },
          {
            text: '猜你喜欢-旅行',
            to: '#guesslike-travel'
          }
        ] 
      }
    },
    mounted () {
      console.log(this)
    },
    methods: {
      ...mapMutations('homepage', [
        'STORE_HOMEPAGE_DATA',
        'UPDATE_HOMEPAGE_DATA'
      ]),
      handleSave () {
        // TODO: save data
        this.$apollo.mutate({
          mutation: HOMEPAGE_MUTATION,
          variables: {
            input: this.queryRemoveTypename(this.data)
          }
        })
        .then((res) => {
          console.log(res)
        })
      },
      handleAdd (name, model) {
        // TODO: 猜你喜欢，从小到大排列，并特殊显示新添加的数据
        // 如果传入的是'buyerrecommend',需要传入model，针对model添加对应项
        let block = name === 'buyerrecommend' ? model : this.getHomepage[name]
        block.item.push(emptyData[name])
      },
      handleDelete (item, name, model) {
        let block = name === 'buyerrecommend' ? model : this.getHomepage[name]
        block.item.splice(block.item.indexOf(item), 1)
      },
      handleUploadSuccess (item) {
        return function uploadSuccess (response, file, fileList) {
          console.log(response)
          item.img.push({
            url: response.url
          })
          // console.log(item)
          // console.log(response, file, fileList)
        }
      },
      handlePreview () {

      },
      handleRemove (item) {
        return function remove (file, fileList) {
          console.log('删除图片', file, fileList, item)
          if (file.url.includes('http://venus-resource.oss-cn-shanghai.aliyuncs.com')) {
            let name = file.url.split('/').pop()
            console.log('删除的图片是：', name)
            api.deleteImg(name)
            .then((res) => {
              console.log('删除图片情况', res)
            })
          }
          item.img.splice(item.img.indexOf(file), 1)
        }
      },
      handleAuthorChange (item) {

      },
      handleAddGuesslike (itemName) {
        let empty = itemName === 'swiper' ? emptyData.swiper : emptyData.guesslike
        this.getHomepage.guesslike[itemName].push(empty)
      },
      handleDeleteGuesslike (item, itemName) {
        this.getHomepage.guesslike[itemName].splice(this.getHomepage.guesslike[itemName].indexOf(item), 1)
      },
      toggleGuesslikeGroupEntry (itemName) {
        this.isGuesslikeGroupEntry[itemName] = !this.isGuesslikeGroupEntry[itemName]
      },
      handleChangeGuesslike (itemName) {
        console.log(this.entryGuesslikes)
        let guesslikeArr = this.entryGuesslikes.split(',')
        console.log(guesslikeArr)
        guesslikeArr.map((item) => {
          let obj = {
            id: item,
            __typename: 'guesslikeItem'
          }
          this.getHomepage.guesslike[itemName].push(obj)
        })
        this.isGuesslikeGroupEntry[itemName] = false
      },

      editNavTo (to) {
        console.log(to)
        let editWrapper = this.$refs.editWrapper
        const height = document.querySelector(to).offsetTop
        console.log(height)
        editWrapper.scrollTo(0, height - 150)
      },

      queryRemoveTypename (item) {
        let newInput
        if (typeof item === 'object') {
          // 如果依然是对象类型（数组也是，递归调用），基本类型，复制到新对象
          if (Array.isArray(item)) {
            newInput = []
            for (let [index, value] of item.entries()) {
              if (typeof value === 'object') {
                newInput[index] = this.queryRemoveTypename(value)
              }
            }
          } else {
            newInput = {}
            for (let [key, value] of Object.entries(item)) {
              if (typeof value === 'object') {
                newInput[key] = this.queryRemoveTypename(value)
              } else {
                if (key !== '__typename') {
                  newInput[key] = value
                }
              }
            }
          }
        }
        return newInput
      }
    },
    watch: {
      data (newValue) {
        this.getHomepage = JSON.parse(JSON.stringify(newValue))
      },
      getHomepage: {
        handler: function (val) {
          let a = JSON.stringify(val)
          let b = JSON.stringify(this.$store.state.homepage.data)
          if (a === b) {
            return
          }
          console.log(val)
          this.UPDATE_HOMEPAGE_DATA(val)
          console.log('getHomepage 改变了123')
        },
        deep: true
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editHomepageDate {
    height: 100%;
  }
  .editHomepageDate .tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    /* 修改 height 下边 edit-wrapper 的 height 一起修改 */
    box-shadow: 0px 0px 10px rgba(0,0,0,.8);
  }
  .edit-wrapper {
    height: 100%;
    overflow-y: auto;
  }
  .edit-wrapper .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 2px solid #ddd;
  }
  .edit-wrapper .edit-main {
    margin: 10px 30px 30px;
  }
  .edit-wrapper .title-tools {
    display: flex;
  }
  .edit-wrapper .showkind {
    margin: 0 20px;
  }
  .edit-wrapper .main-title {
    display: inline-block;
    margin: 10px 0;
    padding: 10px;
    background-color: #ecf5ff;
    color: #409EFF;
  }
  .edit-wrapper .edit-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px dashed #ddd;
    margin: 0 30px;
    padding: 30px 0;
  }
  .edit-item {
    margin: 10px 0;
  }
  .edit-wrapper .edit {
    flex: none;
    width: 500px;
    position: relative;
    margin: 5px;
    padding: 30px;
    border: 1px solid #ddd;
  }
  .guide .subtitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
    color: rgb(39, 72, 98);
    border-left: 2px solid rgb(39, 72, 98);
  }
  .upload {
    margin-bottom: 10px;
  }
  .delete {
    right: 10px;
    top: 10px;
    position: absolute;
  }

  .edit-wrapper .edit-guesslike {
    width: 150px;
    padding: 0 25px;
    border: none;
  }
  .edit-wrapper .edit-guesslike-group {
    padding: 30px;
  }
  .edit-wrapper .edit-content.edit-guesslike-wrapper {
    justify-content: flex-start;
  }
  .edit-wrapper .edit-guesslike .delete {
    right: 5px;
    top: 7px;
  }
  .edit-wrapper .guesslike .num {
    margin: 0 10px;
  }
  .state {
    display: flex;
    height: calc(100% - 50px);
  }
  .state .edit-nav {
    width: 200px;
    padding: 10px;
  }
  .state .edit-nav .nav-list {
    padding: 5px 0;
  }
  .state .edit-nav .nav-list:hover {
    color: #409EFF;
    cursor: pointer;
  }
</style>
