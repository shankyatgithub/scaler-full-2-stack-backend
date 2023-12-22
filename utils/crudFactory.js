
const getObjectsByFilter_Factory_Handler = (objectModel) =>
    async function getByFilter_MongoDB_Handler (req,res) {
        console.log(`get by filter ${objectModel.modelName}`)
        
        try{
            const {sort, select, pageSize, pageNumber} = req.query
            console.log(sort);
            console.log(select);

            let queryPromise = objectModel.find()

            if(sort){
                const [sortParam, sortOrder] = sort.split(" ")
                console.log("sortParam", sortParam);
                console.log("sortOrder", sortOrder);
                if(sortOrder === "asc"){
                    queryPromise = queryPromise.sort(sortParam)
                }
                else{
                    queryPromise = queryPromise.sort(`-${sortParam}`)
                }
            }

            if(select){
                queryPromise = queryPromise.select(select)
            }

            if(pageNumber && pageSize)
            {
                const page = pageNumber || 1
                const limit = pageSize || 1
                // calculate the skip value for this page
                const skip = (page - 1) * limit
                queryPromise = queryPromise.skip(skip).limit(limit);
            }
            
            const result = await queryPromise
            res.status(200).json({
                status: 'success',
                data: result
            })
            
        }
        catch(err){
            res.status(500).json({
                error: err.message
            })
        }
    }

const getAllObjects_Factory_Handler = (objectModel) => 
    async function getAll_MongoDB_Handler (req,res){
        console.log(`Get all ${objectModel.modelName}`);
        try{
            
            const data = await objectModel.find();
            
            if(data.length === 0){
                throw new Error("No data found");
            }
            else{
                res.status(200).json({
                    status : 'success',
                    data:data
                });
            }
        }
        catch(err)
        {
            console.log('Error in getting all objects : ', err);
            res.status(500).json({
                status:'failure',
                message:err.message
            })
        }
};

const createObject_Factory_Handler = (objectModel) =>
    async function createObject_MongoDB_Handler (req,res) {
        //create a new entry in the database
        console.log("create a new entry in the database - ", objectModel.modelName);
        try{
           
            const addEntity = req.body;
            console.log(addEntity);
            const entityAdded = await objectModel.create(addEntity)

            res.status(201).json({
                status:"sucess",
                data:entityAdded
            })
        }
        catch(err){
            res.status(500).json({
                status:"error",
                message:err.message
            })
        }
    };

const getObjectById_Factory_Handler = (objectModel) =>
async function getObjectById_MongoDB_Handler (req,res) {
    
    let id=req.params.id;
    
    console.log(`get ${objectModel.modelName} by id ${id}`);

    try{
        let objData =await objectModel.findById(id);
        if(!objData){
            res.status(404).json({
                status:'failure',
                message:`No ${objectModel} with the id ${id}`
            })
        }
        else{
            res.status(200).json({
                status:'Success',
                data:objData
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status:'Fail',
            message:err.message
        });
    }
}

const updateObjectById_Factory_Handler = (objectModel) => 
    async function updateObjectById_MongoDB_Handler(req,res,next) {
        // Get the data from the body of the request
        let updtData = req.body;
        // Get the ID from the params of the request
        let id = req.params.id;
        try{
            // Look for the object in the database using the provided ID
            let user = await objectModel.findById(id);
            if (!user) {
                res.status(500).json({
                    status : 'No data found',
                    message : 'No data found'
                }); 
            }
                // Update the object's information with the new data
            user = await user.updateOne(updtData);
            res.status(200).json({
                status : 'success',
                message : `The ${objectModel.modelName} has been updated`,
                data : user
            });
        }catch(e){
            console.error("Error updating user: ", e);
            res.status(500).json({
                status : 'error',
                message : 'Server error when updating the user'
        });
    }
}


module.exports = {
    getAllObjects_Factory_Handler,
    createObject_Factory_Handler,
    getObjectById_Factory_Handler,
    updateObjectById_Factory_Handler,
    getObjectsByFilter_Factory_Handler
}