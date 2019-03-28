import React from 'react';
import style from './photos.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      current_id: 0,
      lg_photos: [],
      sm_photos: [],
      traveler: [],
      room: [],
      other_type: '',
      other_source: [],
      current_photo: 0
    })
  }

  render() {
    return (
      <div className={style.photoContainer}>
        <div className={style.mainAndMorePhotos}>
          <div className={style.mainPhoto}></div>
          <div className={style.morePhotos}>
            <div>p00</div>
            <div>p01</div>
            <div>p02</div>
            <div>p03</div>
            <div>p04</div>
            <div>p05</div>
            <div>p06</div>
            <div>p07</div>
            <div>p08</div>
            <div>p09</div>
            <div>p10</div>
            <div>p11</div>
            <div>p12</div>
            <div>p13</div>
            <div>p14</div>
            <div>p15</div>
            <div>p16</div>
            <div>p17</div>
            <div>p18</div>
            <div>p19</div>
            <div>p20</div>
          </div>
        </div>
        <div className={style.additionalPhotosContainer}>
          <div className={`${style.travelerPhotos} ${style.additionalContainer}`}></div>
          <div className={style.roomPhotos}></div>
          <div className={style.video}></div>
        </div>
      </div>
    )
  }
}

export default App;