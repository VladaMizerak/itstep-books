<template>
    <div>
        <Header/>
        <StepThree/>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue";
    import StepThree from "@/components/StepThree.vue";
    import Footer from "@/components/Footer.vue";


    export default{
        name: 'SearchStepThree',
        components:{
            Header,
            StepThree,
            Footer,
        },
    }
</script>