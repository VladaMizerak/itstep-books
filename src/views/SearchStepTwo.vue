<template>
    <div>
        <Header/>
        <StepTwo/>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue";
    import StepTwo from "@/components/StepTwo.vue";
    import Footer from "@/components/Footer.vue";


    export default{
        name: 'SearchStepTwo',
        components:{
            Header,
            StepTwo,
            Footer
        },
    }
</script>