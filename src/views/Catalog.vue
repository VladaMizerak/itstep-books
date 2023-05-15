<template>
    <div>
        <Header/>
        <Books/>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue";
    import Books from "@/components/Books.vue";
    import Footer from "@/components/Footer.vue";


    export default{
        name: 'Catalog',
        components:{
            Header,
            Books,
            Footer
        },
    }
</script>