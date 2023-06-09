<template>
    <div>
        <Header/>
        <Result/>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Result from "@/components/Result.vue";
    import Footer from "@/components/Footer.vue";

    export default{
        name: 'BooksResult',
        components:{Header, Result, Footer},
    }
</script>

