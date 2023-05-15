<template>
    <div>
        <Header/>
        <StepOne/>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue";
    import StepOne from "@/components/StepOne.vue";
    import Footer from "@/components/Footer.vue";


    export default{
        name: 'SearchStepOne',
        components:{
            Header,
            StepOne,
            Footer
        },
    }
</script>