<?php

namespace Infotap\AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class FeedsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('message')
            ->add('aadharId')
            ->add('gender','choice',array('attr'=>array('class'=>'profile-input-radio'),'empty_value' => false,'required'=>false,'expanded'=>true,'multiple'=>false,'choices'=>array(1=>'Male',0=>'Female')))
            ->add('ageFrom')
            ->add('ageTo')
            ->add('location')
            ->add('area','hidden')
            ->add('city','hidden')
            ->add('state','hidden')
            //->add('pincode')
            ->add('latitude','hidden')
            ->add('longitude','hidden')
            ->add('dept')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Infotap\AdminBundle\Entity\Feeds'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'infotap_adminbundle_feeds';
    }
}
