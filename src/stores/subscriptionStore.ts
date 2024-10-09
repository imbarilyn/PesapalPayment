import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useNotificationsStore } from '@/stores'

export interface CustomerPayload {
  company_name: string
  company_email: string
  company_phone: string
  admin_name: string
  admin_email: string
  admin_phone: string
  package_slug: string
}

export interface PaymentIframe {
  isShowPaymentIframe: boolean
  iframeContent: string
  message?: string
}



export const useSubscriptionStore = defineStore('subscriptionStore', () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string
  const iframe = ref<PaymentIframe>()
  const getIframe = computed(() => iframe.value)
  const isOpenModal = ref({
    isOpen: false
  })

  const closeDialog = () =>{
    isOpenModal.value.isOpen = false
  }




  async function clientSignup(customerPayload: CustomerPayload) {
    console.log(customerPayload)

    const notification = useNotificationsStore()
    try {
      const response = await fetch(`${BASE_URL}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerPayload)
      })
      console.log(response)
      const data = await response.text()
      console.log("!!!", data)
      if(response.status === 200){
        isOpenModal.value.isOpen = true
        notification.addNotification('Subscription successful', 'success')

       return  iframe.value= {
          isShowPaymentIframe: true,
          iframeContent: data,
        }
      }
      else if(response.status === 201){
        try{
          notification.addNotification('Subscription successful', 'success')
          setTimeout(()=>{
            window.location.href = 'https://saas.sokojumla.co.ke/auth/login'
          },200)

        }
        catch(error){
          console.error(error)
          notification.addNotification('Subscription failed', 'error')
        }
      }
      else{
        isOpenModal.value.isOpen = true
        // notification.addNotification('Subscription failed', 'error')
        const {status, message} = JSON.parse(data)
       return iframe.value = {
          isShowPaymentIframe: false,
          iframeContent: '',
         message: message
       }
      }
    } catch (error) {
      console.error(error)
      return
    }
  }

  async function getPackages (){
    console.log('display the subscription!!')
    const notification = useNotificationsStore()
    try {
      const response = await fetch(`${BASE_URL}/subscriptions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      const res = await response.json()
      console.log(res)
      const {status, data} = res
      if(status === 'success'){
        notification.addNotification('Packages fetched successfully', 'success')
      }
      else{
        notification.addNotification('There is an error, please try again', 'error')
      }
      return data
    }
    catch (error) {
      console.log(error)
      notification.addNotification('There is an error, please try again', 'error')
      return{
        result: 'fail'
      }
    }
  }
  //   pesapal subscription
  // async function subscription() {
  //   try {
  //     fetch('https://towersaccocrm.mzawadi.com/pesapal.php')
  //       .then((response) => {
  //         return response.text()
  //       })
  //       .then((data) => {
  //         console.log(data)
  //         isLoadingPayment.value = true
  //         setTimeout(()=>{
  //           isLoadingPayment.value = false
  //         }, 500)
  //        iframe.value = {
  //           isShowPaymentIframe: true,
  //          iframeContent: data
  //         }
  //
  //
  //
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   } catch (error) {
  //     console.log(error)
  //     return
  //   }
  // }

  return {
    clientSignup,
    getPackages,
    getIframe,
    iframe,
    isOpenModal,
    closeDialog
  }
})
