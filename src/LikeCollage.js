const {increaseCountLikeAtCollage,decreaseCountLikeAtCollage,
    addUserByLike, deleteUserByLike, UserLikeCollage} = require("../DB_requests/LikeCollageRequests");
const {decode, auth} = require("./Hash");

exports.likeCollage = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let collageId = req.params.id;
    if (!Number(collageId)) {
        res.status(400).json({
            error: "id is not valid"
        });
        return;
    }
    try {
        let data = await UserLikeCollage(id, collageId);
        if (!data){
            await increaseCountLikeAtCollage(collageId);
            await addUserByLike(id, collageId);
            res.status(201).json({isLike: true})
        }else{
            res.status(400).json({
                error:"already liked"
            })
        }
    }catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        })
    }
};

exports.deleteLikeCollage = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let collageId = req.params.id;
    if (!Number(collageId)) {
        res.status(400).json({
            error: "id is not valid"
        });
        return;
    }
    let data = await UserLikeCollage(id, collageId);
    if (data){
        await decreaseCountLikeAtCollage(collageId);
        await deleteUserByLike(id, collageId);
        res.status(200).json({isDeleteLike: true})
    }else{
        res.status(400).json({
            error:"already dont like"
        })
    }
};