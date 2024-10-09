<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { type PaymentIframe, useSubscriptionStore } from '@/stores'
import DialogModal from '@/views/toasts/DialogModal.vue'
import router from '@/router'

const signUpData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  companyName: '',
  companyEmail: '',
  companyPhoneNo: ''
})

const nameValidator = (value: string) => {
  const nameRegExp = /^[a-zA-Z]+$/
  if (!value) {
    return 'name is required'
  }
  if (value.length < 3) {
    return 'name must be at least 3 characters'
  }
  if (!nameRegExp.test(value)) {
    return 'name must be alphabets only'
  }
  return true
}

const companyNameValidator = (value: string) => {
  if (!value) {
    return 'Company name is required'
  }
  if (value.length < 3) {
    return 'Company name must be at least 3 characters'
  }
  return true
}

const {
  value: firstName,
  errorMessage: firstNameErrorMessage,
  meta: firstNameMeta
} = useField('firstName', nameValidator)

watch(
  () => signUpData.firstName,
  (value) => {
    firstName.value = value
  }
)

const {
  value: lastName,
  errorMessage: lastNameErrorMessage,
  meta: lastNameMeta
} = useField('lastName', nameValidator)

watch(
  () => signUpData.lastName,
  (value) => {
    lastName.value = value
  }
)

const emailValidator = (value: string) => {
  if (!value) {
    return 'Email is required'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    return 'Email must be valid'
  }

  if (value.length > 50) {
    return 'Email must be less than 50 characters'
  }

  return true
}

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta
} = useField('email', emailValidator)

watch(
  () => signUpData.email,
  (value) => {
    if (value) email.value = value
  }
)

const phoneNoValidator = (value: string) => {
  if (!value) {
    return 'Phone Number required'
  }

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneNoRegex = /^[0-9]{10}$/

  if (!phoneNoRegex.test(value)) {
    return 'Phone number must be valid!!'
  }

  if (value.length > 10 && value.length < 10) {
    return 'Phone number must be 10 digits'
  }

  return true
}

const {
  value: phoneNo,
  errorMessage: phoneNoErrorMessage,
  meta: phoneNoMeta
} = useField('phoneNo', phoneNoValidator)

watch(
  () => signUpData.phoneNo,
  (value) => {
    phoneNo.value = value
  }
)

const {
  value: companyName,
  errorMessage: companyNameErrorMessage,
  meta: companyNameMeta
} = useField('password', companyNameValidator)

watch(
  () => signUpData.companyName,
  (value) => {
    companyName.value = value
  }
)

const {
  value: companyPhoneNo,
  errorMessage: companyPhoneNoErrorMessage,
  meta: companyPhoneNoMeta
} = useField('password', phoneNoValidator)

watch(
  () => signUpData.companyPhoneNo,
  (value) => {
    companyPhoneNo.value = value
  }
)

const {
  value: companyEmail,
  errorMessage: companyEmailErrorMessage,
  meta: companyEmailMeta
} = useField('confirmPassword', emailValidator)

watch(
  () => signUpData.companyEmail,
  (value) => {
    companyEmail.value = value
  }
)

const EverythingOk = computed(() => {
  return (
    firstNameMeta.valid &&
    lastNameMeta.valid &&
    emailMeta.valid &&
    phoneNoMeta.valid &&
    companyNameMeta.valid &&
    companyEmailMeta.valid &&
    companyPhoneNoMeta.valid
  )
})
const isLoadingPayment = ref<boolean>(false)

interface PackageProps {
  package_slug: string
}

// eslint-disable-next-line vue/valid-define-props
const props = defineProps<PackageProps>()
console.log(props.package_slug)
const subscriptionStore = useSubscriptionStore()

const signUp = () => {
  isLoadingPayment.value = true

  if (EverythingOk.value) {
    console.log('Everything is ok')
    const payload = {
      company_name: signUpData.companyName,
      company_email: signUpData.companyEmail,
      company_phone: signUpData.phoneNo,
      admin_name: signUpData.firstName,
      admin_email: signUpData.email,
      admin_phone: signUpData.phoneNo,
      package_slug: props.package_slug
    }
    console.log(payload)
    subscriptionStore
      .clientSignup(payload)
      .then((response) => {
        if (response?.isShowPaymentIframe) {
          console.log('!!!', response)
        } else {
          console.log('Something is wrong')
          console.log(subscriptionStore.getIframe?.message)
        }
      })
      .catch((error) => {
        console.log('Error', error)
      })
      .finally(() => {
        isLoadingPayment.value = false
      })
  } else {
    console.log('Something is wrong')
  }
}

const goBack = ()=>{
router.go(-1)
}
</script>

<template>
  <main
    class="w-full mx-auto bb-5 p-6 py-10 flex-col h-screen bg-white md:flex-row lg:gap-4 flex lg:items-center lg:justify-center"
  >
    <div class="md:w-7/12 md:mt-28">
      <div class="sticky top-0 bg-white">
        <div class="pb-4 btn btn-sm btn-ghost" @click="goBack">
          <span class="material-icons-outlined"> arrow_back </span>
          <span class="font-semibold text-xl">Go Back</span>
        </div>
        <div>

          <h1 class="lg:text-4xl text-2xl font-bold pb-6">Get started in minutes</h1>
          <p class="text-lg font-semibold">Ready to take your business to the next level?</p>
          <p class="hidden lg:block">
            purchase a plan today and unlock exclusive tools, insights, and opportunities.
          </p>
          <p class="">Sign up now and start growing!</p>

        </div>

      </div>
      <div class="">
        <img
          src="/images/road-to-mrkt2.png"
          alt="road-to-market-image"
          class="lg:w-9/12 lg:h-1/2"
        />
      </div>
    </div>
    <div
      class="w-full md:w-6/12 lg:w-5/12 xl:w-4/12 px-4 md:px-2 pe-3 mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Get to Know You</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Go back to pricing page?
            <router-link
              class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              to="/"
            >
              Click here
            </router-link>
          </p>
        </div>

        <div class="mt-1">
          <form @submit.prevent="signUp" class="">
            <!-- Email -->
            <div class="flex flex-col space-y-1">
              <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col space-y-1">
                  <label class="label font-semibold text-sm text-white" for="firstName">first Name </label>
                  <input
                    id="firstName"
                    v-model="signUpData.firstName"
                    :class="{
                      'input-error': firstNameMeta.validated && !firstNameMeta.valid,
                      'input-primary': firstNameMeta.validated && firstNameMeta.valid
                    }"
                    class="input input-primary input-bordered text-sm w-full"
                    placeholder="John"
                    type="text"
                    required
                  />
                  <small
                    v-if="firstNameMeta.validated && !firstNameMeta.valid"
                    class="text-sm text-rose-500"
                  >
                    {{ firstNameErrorMessage }}
                  </small>
                </div>
                <div class="flex flex-col space-y-1">
                  <label class="label font-semibold text-sm text-white" for="lastName">Last Name </label>
                  <input
                    id="lastName"
                    v-model="signUpData.lastName"
                    :class="{
                      'input-error': lastNameMeta.validated && !lastNameMeta.valid,
                      'input-primary': lastNameMeta.validated && lastNameMeta.valid
                    }"
                    class="input input-primary input-bordered text-sm w-full"
                    placeholder="Doe"
                    type="text"
                    required
                  />
                  <small
                    v-if="lastNameMeta.validated && !lastNameMeta.valid"
                    class="text-sm text-rose-500"
                  >
                    {{ lastNameErrorMessage }}
                  </small>
                </div>
              </div>

              <div>
                <label class="label font-semibold text-sm text-white" for="email"> Email </label>
                <input
                  id="email"
                  v-model="signUpData.email"
                  :class="{
                    'input-error': emailMeta.validated && !emailMeta.valid,
                    'input-primary': emailMeta.validated && emailMeta.valid
                  }"
                  class="input input-primary input-bordered text-sm w-full"
                  placeholder="Johndoe@gmail.com"
                  type="email"
                  required
                />
                <small v-if="emailMeta.validated && !emailMeta.valid" class="text-sm text-rose-500">
                  {{ emailErrorMessage }}
                </small>
              </div>
              <div class="">
                <label class="label font-semibold text-sm text-white" for="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  v-model="signUpData.phoneNo"
                  :class="{
                    'input-error': phoneNoMeta.validated && !phoneNoMeta.valid,
                    'input-primary': phoneNoMeta.validated && phoneNoMeta.valid
                  }"
                  class="input input-primary input-bordered w-full text-sm"
                  placeholder="0712345678"
                  required
                  type="text"
                />
                <small
                  v-if="phoneNoMeta.validated && !phoneNoMeta.valid"
                  class="text-sm text-rose-500"
                >
                  {{ phoneNoErrorMessage }}
                </small>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="">
                  <label class="label font-semibold text-sm text-white" for="companyName">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    v-model="signUpData.companyName"
                    :class="{
                      'input-error': companyNameMeta.validated && !companyNameMeta.valid,
                      'input-primary': companyNameMeta.validated && companyNameMeta.valid
                    }"
                    class="input input-primary input-bordered w-full text-sm"
                    placeholder="company"
                    type="text"
                    required
                  />
                  <small
                    v-if="companyNameMeta.validated && !companyNameMeta.valid"
                    class="text-sm text-rose-500"
                  >
                    {{ companyNameErrorMessage }}
                  </small>
                </div>

                <div class="">
                  <label class="label font-semibold text-sm text-white" for="companyEmail">
                    Company Email
                  </label>
                  <input
                    id="companyEmail"
                    v-model="signUpData.companyEmail"
                    :class="{
                      'input-error': companyEmailMeta.validated && !companyEmailMeta.valid,
                      'input-primary': companyEmailMeta.validated && companyEmailMeta.valid
                    }"
                    class="input input-primary input-bordered w-full text-sm"
                    placeholder="company@gmail.com"
                    type="email"
                    required
                  />
                  <small
                    v-if="companyEmailMeta.validated && !companyEmailMeta.valid"
                    class="text-sm text-rose-500"
                  >
                    {{ companyEmailErrorMessage }}
                  </small>
                </div>
              </div>
              <div class="">
                <label class="label font-semibold text-sm text-white" for="companyPhoneNumber"
                  >Company Phone Number</label
                >
                <input
                  id="companyPhoneNumber"
                  v-model="signUpData.companyPhoneNo"
                  :class="{
                    'input-error': companyPhoneNoMeta.validated && !companyPhoneNoMeta.valid,
                    'input-primary': companyPhoneNoMeta.validated && companyPhoneNoMeta.valid
                  }"
                  class="input input-primary input-bordered w-full text-sm"
                  placeholder="0712345678"
                  required
                  type="text"
                />
                <small
                  v-if="companyPhoneNoMeta.validated && !companyPhoneNoMeta.valid"
                  class="text-sm text-rose-500"
                >
                  {{ companyPhoneNoErrorMessage }}
                </small>
              </div>
              <div class="pt-4">
                <button
                  class="btn btn-sm w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="submit"
                >
                  <span
                    class="loading loading-md loading-spinner text-neutral-400"
                    v-if="isLoadingPayment"
                  ></span>
                  <span v-else>Sign up</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <teleport to="body">
      <DialogModal :is-open="subscriptionStore.isOpenModal.isOpen">
        <template #title>
          <div v-if="subscriptionStore.getIframe?.isShowPaymentIframe">
            <p class="text-center text-stone-800 font-semibold text-2xl">Processing payment</p>
          </div>
          <div v-else class="space-y-4">
            <div class="flex justify-center">
              <span class="material-icons text-rose-500 !text-5xl"> cancel </span>
            </div>
          </div>
        </template>
        <template #body>
          <div v-if="subscriptionStore.getIframe?.isShowPaymentIframe">
            <iframe :src="subscriptionStore.getIframe?.iframeContent" class="w-full h-96"></iframe>
          </div>
          <div v-else class="space-y-4">
            <div class="flex justify-center">
              <p class="text-rose-500">Registration Error</p>
            </div>
            <div class="flex justify-center">
              <p class="font-medium">{{ subscriptionStore.getIframe?.message }}</p>
            </div>
          </div>
        </template>
        <template #footer>
          <div
            class="w-full flex justify-center"
            v-if="!subscriptionStore.getIframe?.isShowPaymentIframe"
          >
            <button class="btn btn-sm outline outline-1" @click="subscriptionStore.closeDialog()">
              <span class="text-light">Try again</span>
            </button>
          </div>
        </template>
      </DialogModal>
    </teleport>
  </main>
</template>
