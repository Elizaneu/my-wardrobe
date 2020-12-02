import React from "react";
import Header from "../Header/Header";
import c from "./Create.module.css";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import {Link} from "react-router-dom";
import {Categories} from "../../Categories";
import {getThing} from "../../API/ThingAPI";

class Create extends React.Component {

    state = {
        option: Categories[0].option,
        Photos: [],
        block: false,
        page: 0,
        lastPage: 0,
        chosenPhotos: [],
    }
    ref = React.createRef();

    async componentDidMount() {
        this.setState({block: true})
        let data = await getThing(this.state.option);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({
            block: false,
            lastPage: LP === -1 ? 0 : LP
        })
    }

    onChangeValue = async (e) => {
        this.setState({option: e.target.value})
        this.setState({block: true})
        let data = await getThing(e.target.value);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({
            block: false,
            lastPage: LP === -1 ? 0 : LP
        })
    }

    changePage = (page) => async () => {
        if (page >= 0) {
            this.setState({page, block: true});
            let data = await getThing(this.state.option, page * 12);
            let LP = Math.ceil(data.count / 12 - 1);
            this.setState({
                block: false,
                Photos: data.rows.map(d => ({...d, delete: false})),
                lastPage: LP === -1 ? 0 : LP
            });
        }
    };

    choosePhoto = (photo) => async () => {
        if (this.state.chosenPhotos.find(p => p.idThing === photo.idThing)) {
            await this.setState(state => ({
                ...state,
                chosenPhotos: state.chosenPhotos.filter(p => p.idThing !== photo.idThing)
            }))
        } else {
            await this.setState(state => ({
                ...state,
                chosenPhotos: [...state.chosenPhotos, photo]
            }))
        }
        this.canvasRender();
    }

    canvasRender = () => {
        const canvas = this.ref.current;
        const ctx = canvas.getContext('2d');
        if (this.state.chosenPhotos.length === 0) {
            ctx.putImageData(new ImageData(500, 500), 0, 0)
        }
        if (this.state.chosenPhotos.length === 1) {
            const img = new Image();
            img.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img, 0, 0, 500, 500)
        }
        if (this.state.chosenPhotos.length === 2) {
            const img1 = new Image(), img2 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 250, 250, 250, 250)
        }
        if (this.state.chosenPhotos.length === 3) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 250, 125, 250, 250)
        }
        if (this.state.chosenPhotos.length === 4) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 250, 0, 250, 250)
            ctx.drawImage(img4, 250, 250, 250, 250)
        }
        if (this.state.chosenPhotos.length === 5) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image(),
                img5 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo
            img5.src = "data:image/png;base64," + this.state.chosenPhotos[4].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 300, 0, 150, 150)
            ctx.drawImage(img4, 300, 175, 150, 150)
            ctx.drawImage(img5, 300, 350, 150, 150)
        }
        if (this.state.chosenPhotos.length === 6) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image(),
                img5 = new Image(), img6 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo
            img5.src = "data:image/png;base64," + this.state.chosenPhotos[4].Photo
            img6.src = "data:image/png;base64," + this.state.chosenPhotos[5].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 33, 0, 150, 150)
            ctx.drawImage(img2, 33, 175, 150, 150)
            ctx.drawImage(img3, 33, 350, 150, 150)
            ctx.drawImage(img4, 292, 0, 150, 150)
            ctx.drawImage(img5, 292, 175, 150, 150)
            ctx.drawImage(img6, 292, 350, 150, 150)
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={c.canvas}>
                    <canvas ref={this.ref} width="500px" height="500px">
                        Обновите браузер!!!
                    </canvas>
                </div>
                <div className={c.container}>
                    <div className={c.topButtons}>
                        <select className={c.categoryButton}
                                value={this.state.option}
                                required
                                onChange={this.onChangeValue}
                                disabled={this.state.block}>
                            {
                                Categories.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <Link to={"/add"} className={c.button}>
                        <span>
                           <img className={c.button_icon} src={plus} alt={""}/>
                        </span>
                            Добавить новый элемент
                        </Link>
                    </div>

                    <div className={c.gallery}>
                        {this.state.Photos.map(u => <img
                            key={u.idThing}
                            className={this.state.chosenPhotos.find(p => p.idThing === u.idThing) ? c.gallery_img + " " + c.chosen : c.gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            onClick={this.choosePhoto(u)}
                            alt=""/>)}
                    </div>
                    <div className={c.bottomButtonsLeft}>
                        <span className={this.state.block || this.state.page === 0
                            ? c.button + " " + c.button_disabled + " " + c.margin
                            : c.button + " " + c.margin}
                              onClick={this.changePage(0)}>
                        В начало
                    </span>
                        <span onClick={this.changePage(this.state.page - 1)}
                              className={this.state.block || this.state.page === 0
                                  ? c.button + " " + c.button_disabled
                                  : c.button}>
                        Предыдущая
                    </span>
                    </div>
                    <div className={c.bottomButtonsRight}>
                        <span onClick={this.changePage(this.state.page + 1)}
                              className={this.state.block || this.state.page === this.state.lastPage
                                  ? c.button + " " + c.button_disabled + ' ' + c.margin
                                  : c.button + ' ' + c.margin}>
                        Следующая
                    </span>
                        <span onClick={this.changePage(this.state.lastPage)}
                              className={this.state.block || this.state.page === this.state.lastPage
                                  ? c.button + " " + c.button_disabled
                                  : c.button}>
                            В конец
                        </span>
                    </div>
                </div>
                <span className={c.button + " " + c.button_save}>
                    Сохранить
                </span>
            </div>
        )
    }
}

export default withAuthRedirect(Create);