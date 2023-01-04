import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import React from 'react'
import ExploreContainer from '../components/ExploreContainer'
import Main_bot from '../components/Main_bot'
import Main_top from '../components/Main_top'
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';


function Main() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
              <div style={{display:'flex'}}>
                    <IonTitle>Customer profile</IonTitle>
                    <IconButton style={{marginRight:'16px'}} color="primary" aria-label="upload picture" component="label">
                      <Edit />
                    </IconButton>
              </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ioncontent' >
          <Main_top/>
          <Main_bot/>
      </IonContent>
    </IonPage>
  )
}

export default Main