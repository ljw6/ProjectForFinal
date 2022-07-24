
module.exports={
    publicPath:'./',
    // devServer:{
    //     host:"localhost",
    //     port:8080
    // },
    pages:{
        index:{
            entry: 'src/main.js',
            template: 'public/index.html',
            title: 'AlgebraKG'
        },
    },
    css:{
        requireModuleExtension: true,
        loaderOptions:{
            less:{
                lessOptions: {
                    javascriptEnabled: true
                }
            }
    },
    }
}