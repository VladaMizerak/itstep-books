<template>
    <div>
        <Header/>
        <HeroSection/>
        <MainContent/>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue";
    import HeroSection from "@/components/HeroSection.vue";
    import MainContent from "@/components/MainContent.vue";
    import Footer from "@/components/Footer.vue";


    export default{
        name: 'Home',
        components:{
            Header,
            HeroSection,
            MainContent,
            Footer
        },
    }
</script>