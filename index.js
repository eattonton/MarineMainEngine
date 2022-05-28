//定义响应数据+非响应数据
datas.active = Vue.ref(0)
datas.activeBotTag = Vue.ref(0)
datas.lstAllEngines = []
datas.keyEngine = Vue.ref("")   //检索key
datas.logos = [
    { thumb: "./res/logo1.png", name: 'cover1' },
]
//定义响应式属性
props.menus = []
props.selectedEngine = {}

const mounted = () => {
    //加载数据
    LoadMenus();

}

function LoadMenus(){
    //清空
    datas.lstAllEngines.length = 0;
    model.engineDatas(null, (res) => {
        if (res && res.length > 0) {
            //1.加载标签
            res.forEach((item, index) => {
                //1.加载标签
                props.menus.push({ label: item.name, name: item.name });
                datas.lstAllEngines.push({...item, index:index});
            });
            vant.Toast('加载完成');
            props.selectedEngine = datas.lstAllEngines[0];
        }
    })
}

//当前的方法methods 里面的事件
methods.onChange = (index) => {
    //获得清单
    props.selectedEngine = datas.lstAllEngines.find((item) => {
        return item.name == props.menus[index].name;
    })
}

methods.onSearch = ()=>{
    if(datas.keyEngine.value){
        props.menus = props.menus.filter((item)=>{
            return item.name.indexOf(datas.keyEngine.value) >= 0;
        });

        if(props.menus.length > 0){
            props.selectedEngine = datas.lstAllEngines.find((item) => {
                return item.name == props.menus[0].name;
            })
        }
    }
}

methods.onCancel = ()=>{
    datas.keyEngine.value = "";
    props.menus.length = 0;
    datas.lstAllEngines.forEach((item, index) => {
        //1.加载标签
        props.menus.push({ label: item.name, name: item.name });
    });
    props.selectedEngine = datas.lstAllEngines[0];
}
 
 