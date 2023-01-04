import { IonAvatar } from '@ionic/react'
import React from 'react'

function Main_top() {
  return (
    <div className='row-1'>
        <div className='row-1-col-1'>
            <div className='row-1-col-1-up'>
                <IonAvatar>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <div>John Teh</div>
                <div>Customers</div>
            </div>
            <div className='row-1-col-1-down'>
                  <div className='row-1-col-1-down-label'>Label</div>
                  <div>follow up</div>
                  <div>add label</div>
                  <div className='row-1-col-1-down-notes'>Notes</div>
            </div>
        </div>


        <div className='row-1-col-2'>
              <div className='info'>
                  <div >Name</div>
                  <div className='bold'>Teh Boon Hong</div>
              </div>
              <div className='info'>
                  <div >Facebook Name</div>
                  <div className='bold'>John Teh</div>
              </div>
              <div className='info'>
                  <div >Email</div>
                  <div className='bold'>Teh@gmail.com</div>
              </div>
              <div className='info'>
                  <div >Contact Number</div>
                  <div className='bold'>010-9876769</div>
              </div>
              <div className='info'>
                  <div >Location</div>
                  <div className='bold'>Selangor, Malaysia</div>
              </div>
        </div>


        <div className='row-1-col-3'>
              <div className='info'>
                  <div >Joined Date</div>
                  <div className='bold'>20/08/21</div>
              </div>
              <div className='info'>
                  <div >Joined Period</div>
                  <div className='bold'>2 Years</div>
              </div>
              <div className='info'>
                  <div >Rejoined Status</div>
                  <div className='bold'>3</div>
              </div>
        </div>
    </div>
  )
}

export default Main_top