<?php

namespace Infotap\AdminBundle\Controller;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Infotap\AdminBundle\Entity\User;
use Infotap\AdminBundle\Entity\UserPreference;
use Infotap\AdminBundle\Form\UserType;


class UserController extends FOSRestController
{

    /**
     * Lists all User entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('InfotapAdminBundle:User')->findAll();

        return $this->render('InfotapAdminBundle:User:index.html.twig', array(
            'entities' => $entities,
        ));
    }
    public function apiRegister1Action(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        if($this->get('request')->getMethod()=='OPTIONS'){
            $returnResponse=new Response(json_encode(array('accept'=>true)));
            $returnResponse->headers->set('Content-Type', 'application/json');
            $returnResponse->headers->set('Access-Control-Allow-Origin', '*');
            $returnResponse->headers->set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            $returnResponse->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            return $returnResponse;
        }
        $return=array();
        $userEntity=new User();
        $userEntity->setAadharId($request->query->get('uid'));
        //$userEntity->setName($request->query->get('name'));
        if($userEntity->getAadharId()){
            $data_string ='{"aadhaar-id":"'.$userEntity->getAadharId().'","location":{"type":"pincode","pincode":"123456"},"channel":"SMS"}';
            $ch = curl_init('https://ac.khoslalabs.com/hackgate/hackathon/otp');                                                                      
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
                'Content-Type: application/json',                                                                                
                'Content-Length: ' . strlen($data_string))                                                                       
            );                                                                                                                                                                                                                       
            $result = curl_exec($ch);
            $resultobj=json_decode($result);
            if($resultobj->success){
                $return['success']=true;
                $return['message']="OTP is sent to your mobile registered with your aadhaar no.";
            }else{
                 $return['success']=false;
                 $return['message']="Invalid aadhaar no. or it is not associated with a mobile number for OTP.";
            }
        }
        $returnResponse=new Response(json_encode($return));
        $returnResponse->headers->set('Content-Type', 'application/json');
        $returnResponse->headers->set('Access-Control-Allow-Origin', '*');
        $returnResponse->headers->set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        $returnResponse->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        return $returnResponse;
    }
    public function apiRegister2Action(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        if($this->get('request')->getMethod()=='OPTIONS'){
            $returnResponse=new Response(json_encode(array('accept'=>true)));
            $returnResponse->headers->set('Content-Type', 'application/json');
            $returnResponse->headers->set('Access-Control-Allow-Origin', '*');
            $returnResponse->headers->set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            $returnResponse->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            return $returnResponse;
        }
        $return=array();



        $userEntity=new User();
        $userEntity->setAadharId($request->query->get('uid'));
        $userEntity->setOtpCode($request->query->get('code'));
        /*if($userEntity->getAadharId()){
            $data_string ='{"aadhaar-id":"'.$userEntity->getAadharId().'","location": {"type": "pincode","pincode": "201304"},"modality": "otp","otp": "'.$userEntity->getOtpCode().'","device-id": "public","certificate-type": "preprod"}';
            $ch = curl_init('https://ac.khoslalabs.com/hackgate/hackathon/auth/raw');                                                                      
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
                'Content-Type: application/json',                                                                                
                'Content-Length: ' . strlen($data_string))                                                                       
            );                                                                                                                                                                                                                       
            $result = curl_exec($ch);
            $resultobj=json_decode($result);
            if($resultobj->success){*/
                $return['success']=true;
                $return['message']="Account created successfully.";
                $existingUserEntity = $em->getRepository('InfotapAdminBundle:User')->findOneBy(array('aadharId'=>$userEntity->getAadharId()));
                if($existingUserEntity){
                    $userEntity=$existingUserEntity;
                    $token=$existingUserEntity->getAccessToken();
                }else{
                    $userEntity->setAccessToken($userEntity->getAadharId().'-'.bin2hex(openssl_random_pseudo_bytes(16)));
                    $token=$userEntity->getAccessToken();
                }
                $userEntity->setName($request->query->get('name'));
                $userEntity->setEmail($request->query->get('email'));
                $userEntity->setMobile($request->query->get('mobile'));
                $userEntity->setLocation($request->query->get('location'));
                $userEntity->setArea($request->query->get('area'));
                $userEntity->setCity($request->query->get('city'));
                $userEntity->setState($request->query->get('state'));
                $userEntity->setAndroidRegId($request->query->get('androidRegId'));
                if(is_array($request->query->get('gender'))){
                    $gender=$request->query->get('gender');
                    $userEntity->setGender($gender[1]);
                }
                $day=null;$month=null;$year=null;
                if(is_array($request->query->get('day'))){
                    $dayarr=$request->query->get('day');
                    $day=($dayarr[1]);
                }
                if(is_array($request->query->get('month'))){
                    $montharr=$request->query->get('month');
                    $month=($montharr[1]);
                }
                if(is_array($request->query->get('year'))){
                    $yeararr=$request->query->get('year');
                    $year=($yeararr[1]);
                }
                if($day&&$month&&$year){
                    $dob = \DateTime::createFromFormat('d-m-Y',$day.'-'.$month.'-'.$year);
                    $userEntity->setDob($dob);
                }

                if(!$existingUserEntity){
                    $userEntity->setStatus(1);
                    $em->persist($userEntity);
                    $em->flush();
                    $departments = $em->getRepository('InfotapAdminBundle:Department')->findAll();
                    foreach ($departments as $department) {
                        $userPreference=new UserPreference();
                        $userPreference->setDept($department);
                        $userPreference->setUser($userEntity);
                        $em->persist($userPreference);
                    }
                }
                $em->flush();
                $userObject=new \stdClass;
                $userObject->token=$userEntity->getAccessToken();
                $userObject->name=$userEntity->getName();
                $return['user']= $userObject;
            /*}else{
                 $return['success']=false;
                 $return['message']="Invalid OTP.";
            }
        }*/
        $returnResponse=new Response(json_encode($return));
        $returnResponse->headers->set('Content-Type', 'application/json');
        $returnResponse->headers->set('Access-Control-Allow-Origin', '*');
        $returnResponse->headers->set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        $returnResponse->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        return $returnResponse;
    }
    /**
     * Creates a new User entity.
     *
     */
    public function createAction(Request $request)
    {
        $entity = new User();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('user_show', array('id' => $entity->getId())));
        }

        return $this->render('InfotapAdminBundle:User:new.html.twig', array(
            'entity' => $entity,
            'form'   => $form->createView(),
        ));
    }

    /**
     * Creates a form to create a User entity.
     *
     * @param User $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(User $entity)
    {
        $form = $this->createForm(new UserType(), $entity, array(
            'action' => $this->generateUrl('user_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new User entity.
     *
     */
    public function newAction()
    {
        $entity = new User();
        $form   = $this->createCreateForm($entity);

        return $this->render('InfotapAdminBundle:User:new.html.twig', array(
            'entity' => $entity,
            'form'   => $form->createView(),
        ));
    }

    /**
     * Finds and displays a User entity.
     *
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('InfotapAdminBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return $this->render('InfotapAdminBundle:User:show.html.twig', array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing User entity.
     *
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('InfotapAdminBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return $this->render('InfotapAdminBundle:User:edit.html.twig', array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
    * Creates a form to edit a User entity.
    *
    * @param User $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(User $entity)
    {
        $form = $this->createForm(new UserType(), $entity, array(
            'action' => $this->generateUrl('user_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing User entity.
     *
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('InfotapAdminBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('user_edit', array('id' => $id)));
        }

        return $this->render('InfotapAdminBundle:User:edit.html.twig', array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }
    /**
     * Deletes a User entity.
     *
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('InfotapAdminBundle:User')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find User entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('user'));
    }

    /**
     * Creates a form to delete a User entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('user_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
