<template>
    <div class="post_article">
        <div class="post_cover">
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconDocument" />
                </span>
            </div>
            <h1 class="post_title">srsRAN工具使用</h1>
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconUser" />
                    WX
                </span>
                <span class="meta">
                    <component :is="Icons.IconRili" />
                    {{today}}                
                </span>
            </div>
        </div>
        <div class="post_content">
            <div class="tip tip-info fade-in visible">
                <div class="tip-body"></div>
            </div>
            <h2 class="fade-in">构建说明</h2>
                <div class="fade-in">
                    <strong>安装依赖项</strong><br>
                    <div style="padding-left: 2em;">
                      sudo apt-get install cmake make gcc g++ pkg-config libfftw3-dev libmbedtls-dev libsctp-dev libyaml-cpp-dev
                      <br>
                    </div>
                    <strong>拉取srsRAN项目</strong><br>
                    <div style="padding-left: 2em;">
                    git clone <a href="https://github.com/srsran/srsRAN_Project.git" target="_blank">https://github.com/srsRAN/srsRAN_Project.git</a><br></div>
                    <strong>构建代码库</strong><br>
                    <div style="padding-left: 2em;">
                    cd srsRAN_Project<br>
                    mkdir build<br>
                    cd build<br>
                    cmake ../ <br>
                    make -j $(nproc)<br>
                    </div>
                </div>
            <h2 class="fade-in">gNB配置</h2>
                <div class="fade-in">
                    <div style="padding-left: 2em;">
                        cd build/apps/gnb<br>
                        cp ../../../configs/gnb_rf_b200_tdd_n78_20mhz.yml new_gNB.yml<br>
                    </div>
                </div>
            
            <h2 class="fade-in">gNB配置修改</h2>
                <div class="fade-in">
                <pre class="yaml-block">{{ yamlText }}</pre>
                </div>
            <h2 class="fade-in">引用相关文档</h2>
                <div class="fade-in">
                    <a href="https://github.com/srsran/srsRAN_Project.git" target="_blank"><strong>srsRAN_Project Git地址</strong></a><br>
                    <a href="https://docs.srsran.com/projects/project/en/latest/tutorials/source/index.html" target="_blank"><strong>srsRAN教程</strong></a><br>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Icons from '@/components/icons/Icons'
import '@/static/css/post.css';
import { computed, ref } from 'vue';
const today = ref(new Date().toISOString().slice(0, 10))
const birthday = "1998-07-16";
const age = computed(() => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
     today.getDate() >= birthDate.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
});

const yamlText = `cu_cp:
  amf:
    addr: 10.1.1.13  # 和核心网AMF的地址一致
    port: 38412
    bind_addr: 10.1.1.13 
    supported_tracking_areas:
      - tac: 7    # 和核心网AMF的TAC一致
        plmn_list:
          - plmn: "00101"  # 和SIM卡的PLMN一致
            tai_slice_support_list:
              - sst: 1

ru_sdr:
  device_driver: uhd
  device_args: type=b200,num_recv_frames=256,num_send_frames=256
  srate: 23.04
  otw_format: sc12
  tx_gain: 75
  rx_gain: 75

cell_cfg:
  band: 78
  dl_arfcn: 632628
  channel_bandwidth_MHz: 20
  common_scs: 30
  plmn: "00101"
  tac: 7
  pci: 1


pcap:
  mac_enable: true
  mac_filename: /tmp/5G_Record/gnb_mac.pcap
  ngap_enable: true
  ngap_filename: /tmp/5G_Record/gnb_ngap.pcap
  rlc_enable: true
  rlc_filename: /tmp/5G_Record/gnb_rlc.pcap
  

log:
  filename: /tmp/5G_Record/gnb.log
  all_level: warning

`;
</script>

<style scoped>

.post_cover::before {
    background-image: url('@/static/img/default.jpg');
}
</style>
