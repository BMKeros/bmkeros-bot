class Bot {
    constructor(){
        this.modules = [];
    };

    addModule(module){
        this.modules.push(module);
    }

    getModules(){
        return this.modules;
    }
};

export default Bot;
